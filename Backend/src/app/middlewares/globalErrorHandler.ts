/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { TErrorSources } from "../interfaces/error.interface";
import { handleDuplicateError } from "../utils/errorHelpers/handleDuplicateError";
import { handleZodError } from "../utils/errorHelpers/handleZodError";
import { envVars } from "../../config/env";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

  if(envVars.NODE_ENV === "development"){
    console.log(err);
  }
  
  
  if(req.file){
    await deleteImageFromCloudinary(req.file.path)
  }
  if(req.files && Array.isArray(req.files) && req.files.length){
    const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)

    await Promise.all(imageUrls.map(url => deleteImageFromCloudinary(url)))

  }

  let errorSources : TErrorSources[] = [];
  let statusCode = err.statusCode || 500;
  let message = "Something went wrong!";

  
  //duplicate error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message
  }
  //zod error
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources as TErrorSources[]
  }
  //other global errors
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }


  res.status(statusCode).json({
    success: false,
    message,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
