/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import sendResponse from "../../utils/sendResponse";
import { createUserTokens } from "../../utils/userTokens";
import { prisma } from "../../../config/db";
import { AuthService } from "./auth.service";
import bcrypt from "bcryptjs";


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    throw new AppError(StatusCodes.BAD_REQUEST, "No Refresh Token Received from Cookies.");
  }

  const tokenInfo = await AuthService.getNewAccessToken(refreshToken as string);


  setAuthCookie(res, tokenInfo)


  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "New Access Token Retrieved Successfully",
    data: tokenInfo,
  });
});


export const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError(StatusCodes.NOT_FOUND, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid password"));
    }

    const userToken = await createUserTokens(user);

    setAuthCookie(res, userToken);

    const { password: _, ...rest } = user;

    
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Logged in successfully",
      data: {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest,
      },
    });
  }
);




const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Logged Out Successfully",
    data: null,
  });
});




export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,

};
