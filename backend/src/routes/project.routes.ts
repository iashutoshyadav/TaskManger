import { Router } from "express";
import * as projectController from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", projectController.createProject);
router.get("/", projectController.getMyProjects);
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export default router;
