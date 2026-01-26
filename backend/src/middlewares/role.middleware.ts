import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { UserRole, UserModel } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export const checkRole = (allowedRoles: UserRole[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;
            if (!userId) {
                throw ApiError.unauthorized("Authentication required");
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                throw ApiError.unauthorized("User not found");
            }

            if (!allowedRoles.includes(user.role)) {
                throw ApiError.forbidden("You do not have permission to perform this action");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
