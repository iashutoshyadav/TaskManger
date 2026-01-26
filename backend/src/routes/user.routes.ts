import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMe, updateMe, getAllUsers } from "../controllers/user.controller";

const router = Router();

router.use(authMiddleware);
router.get("/me", getMe);
router.put("/me", updateMe);
router.get("/", getAllUsers);

export default router;
