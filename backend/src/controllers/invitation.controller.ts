import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as invitationService from "../services/invitation.service";

export const createInvitation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const invitation = await invitationService.createInvitation(
            email,
            req.userId!
        );

        res.status(201).json({ invitation });
    } catch (error) {
        next(error);
    }
};

export const verifyInvitation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.params;
        const invitation = await invitationService.verifyInvitation(token);
        res.json({ invitation });
    } catch (error) {
        next(error);
    }
};

export const acceptInvitation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Invitation token is required" });
        }

        const user = await invitationService.acceptInvitation(token, req.userId!);
        res.json({ message: "Joined organization successfully", user });
    } catch (error) {
        next(error);
    }
};
