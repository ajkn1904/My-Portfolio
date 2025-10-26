import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interfaces/Role";
import { multerUpload } from "../../../config/multer.config";

const router = Router();




router.get("/", BlogController.getAllBlogs);
router.post("/", checkAuth(Role.admin), multerUpload.single("thumbnail"), BlogController.createBlog)
router.get("/:id", BlogController.getBlogById);
router.patch("/:id", checkAuth(Role.admin), multerUpload.single("thumbnail"), BlogController.updateBlog);
router.delete("/:id", checkAuth(Role.admin), BlogController.deleteBlog);

export const BlogRouter = router;