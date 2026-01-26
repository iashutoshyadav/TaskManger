import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as messageService from "../services/message.service";
import { findUserById } from "../repositories/user.repository";

export const getMessages = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(req.userId!);
        const organizationId = user?.organizationId?.toString();
        if (!organizationId) {
            return res.json([]); // No organization, no messages
        }

        const limit = Number(req.query.limit) || 50;
        const messages = await messageService.getRecentMessages(organizationId, limit);
        res.json(messages);
    } catch (error) {
        next(error);
    }
};
