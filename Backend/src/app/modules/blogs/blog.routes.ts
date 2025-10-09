import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interfaces/Role";

const router = Router();




router.get("/", checkAuth(Role.admin), BlogController.getAllBlogs);
router.post("/", checkAuth(Role.admin), BlogController.createBlog)
router.get("/:id", checkAuth(Role.admin), BlogController.getBlogById);
router.patch("/:id", checkAuth(Role.admin), BlogController.updateBlog);
router.delete("/:id", checkAuth(Role.admin), BlogController.deleteBlog);

export const BlogRouter = router;