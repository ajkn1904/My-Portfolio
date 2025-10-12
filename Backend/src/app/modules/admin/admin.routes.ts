import { Router } from "express";

import { Role } from "../../interfaces/Role";
import { AdminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/", AdminController.getAdminInfo);
router.patch("/", checkAuth(Role.admin), AdminController.updateAdminInfo);

export const AdminRoutes = router;
