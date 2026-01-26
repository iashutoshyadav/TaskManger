import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMessages } from "../controllers/message.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", getMessages);

export default router;
