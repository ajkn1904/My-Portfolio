import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { ProjectRoutes } from "../modules/projects/project.routes";
import { BlogRouter } from "../modules/blogs/blog.routes";

export const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/admin",
        route: AdminRoutes,
    },
    {
        path: "/projects",
        route: ProjectRoutes,
    }, 
    {
        path: "/blogs",
        route: BlogRouter,
    }, 
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;