import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { StatusCodes } from "http-status-codes";

const createAdminInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdminInfo(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Admin info created successfully",
    data: result,
  });
});


const getAdminInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAdminInfo();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin info retrieved successfully",
    data: result
  });
});

const updateAdminInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateAdminInfo(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin info updated successfully",
    data: result
  });
});

export const AdminController = {
  createAdminInfo,
  getAdminInfo,
  updateAdminInfo
};
