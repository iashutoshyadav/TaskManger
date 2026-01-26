import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as aiController from "../controllers/ai.controller";

const router = Router();

router.use(authMiddleware);

router.post("/magic-workspace", aiController.generateMagicWorkspace);
router.post("/enhance-task", aiController.enhanceTask);
router.get("/daily-standup", aiController.getDailyStandup);

export default router;
