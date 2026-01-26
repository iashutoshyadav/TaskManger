import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";
import { UserRole } from "../models/user.model";

const router = Router();

router.use(authMiddleware);

router.post("/", checkRole([UserRole.ADMIN]), projectController.createProject);
router.get("/", projectController.getMyProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", checkRole([UserRole.ADMIN]), projectController.deleteProject);

export default router;
