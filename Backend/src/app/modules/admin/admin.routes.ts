import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";

import { Role } from "../../interfaces/Role";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", checkAuth(Role.admin), AdminController.getAdminInfo);
router.patch("/", checkAuth(Role.admin), AdminController.updateAdminInfo);

export const AdminRoutes = router;
