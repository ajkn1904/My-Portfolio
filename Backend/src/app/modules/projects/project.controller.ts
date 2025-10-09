import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { projectServices } from "./project.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.createProject(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});


const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getAllProjects(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result.projects,
    meta: result.meta,
  });
});


const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await projectServices.getSingleProject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result.data,
  });
});


const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await projectServices.updateProject(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});


const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await projectServices.deleteProject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.message,
    data: null
  });
});


export const projectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
