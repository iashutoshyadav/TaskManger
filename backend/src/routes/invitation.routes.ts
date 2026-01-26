import { Router } from "express";
import * as invitationController from "../controllers/invitation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, invitationController.createInvitation);
router.post("/accept", authMiddleware, invitationController.acceptInvitation);
router.get("/:token", invitationController.verifyInvitation);

export default router;
