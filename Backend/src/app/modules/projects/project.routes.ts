import { Router } from "express";
import { projectController } from "./project.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../interfaces/Role";


const router = Router();

router.post("/", checkAuth(Role.admin), projectController.createProject);
router.get("/", checkAuth(Role.admin), projectController.getAllProjects);
router.get("/:id", checkAuth(Role.admin), projectController.getSingleProject);
router.patch("/:id", checkAuth(Role.admin), projectController.updateProject);
router.delete("/:id", checkAuth(Role.admin), projectController.deleteProject);

export const ProjectRoutes = router;
