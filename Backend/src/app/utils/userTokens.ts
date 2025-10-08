import { generateToken, verifyToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env";
import { prisma } from "../../config/db";

interface IUser {
  id: number;
  email: string;
  role: string;
}

export const createUserTokens = (user: Partial<IUser>) => {
  if (user.email != 'ajknishat@gmail.com' && user.role !== "ADMIN") {
    throw new AppError(StatusCodes.FORBIDDEN, "Only admin users can get tokens.");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return { accessToken, refreshToken };
};

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExists = await prisma.user.findUnique({
    where: { email: verifiedRefreshToken.email }
  });

  if (!isUserExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist!");
  }

  if (isUserExists.email != 'ajknishat@gmail.com' && isUserExists.role !== "ADMIN") {
    throw new AppError(StatusCodes.FORBIDDEN, "Only admin users can refresh tokens.");
  }

  const jwtPayload = {
    userId: isUserExists.id,
    email: isUserExists.email,
    role: isUserExists.role
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
