import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { Blog } from "../../../generated/prisma";
import { prisma } from "../../../config/db";
import sendResponse from "../../utils/sendResponse";

const createBlog = async (req: Request, res: Response) => {
  try {
    const parsedData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;

    //console.log("Uploaded file info:", req.file);

    const thumbnail = req.file?.path || parsedData.thumbnail || null;

    const result = await prisma.blog.create({
      data: {
        title: parsedData.title,
        content: parsedData.content,
        thumbnail,
        tags: parsedData.tags || [],
        isFeatured: parsedData.isFeatured ?? false,
      },
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to create blog",
      data: (error as any).message,
    });
  }
};





const getAllBlogs = async (req: Request, res: Response) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

        const result = await BlogService.getAllBlogs({page, limit, search, isFeatured, tags});
        
        sendResponse(res, {
        statusCode: 201,
        success: true,
        message:"Blogs Retrieved Successfully!",
        data: result
    })
    } catch (err) {
        sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Failed to Retrieve Blogs",
        data: (err as any).message,
        })
    }
};

const getBlogById = async (req: Request, res: Response) => {
    const Blog = await BlogService.getBlogById(Number(req.params.id));
    
    if (!Blog) return res.status(404).json({ error: "Blog not found" });
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message:"Blog Retrieved Successfully!",
        data: Blog
    })
};

const updateBlog = async (req: Request, res: Response) => {
  try {
   
    const parsedData =
      typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;

    const payload = {
      ...parsedData,
      thumbnail: req.file?.path || parsedData.thumbnail,
    };

    const updatedBlog = await BlogService.updateBlog(Number(req.params.id), payload);

    sendResponse(res, {
        statusCode:200,
        success: true,
        message: "Blog Updated Successfully!",
        data: updatedBlog,
    });
    } catch (error) {
        sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "Failed to Update Blog.",
        data: (error as any).message,
        })
    }
};


const deleteBlog = async (req: Request, res: Response) => {
    const result = await BlogService.deleteBlog(Number(req.params.id));
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message:"Blog Deleted Successfully!",
        data: null
    })
};



export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
}