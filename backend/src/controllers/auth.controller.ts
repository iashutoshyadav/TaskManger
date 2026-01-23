import { Request, Response, NextFunction } from "express";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";
import { registerUser, loginUser } from "../services/auth.services";
import { AuthRequest } from "../middlewares/auth.middleware";
import { findUserById } from "../repositories/user.repository";
import { env } from "../config/env";
import { CookieOptions } from "express";
import { ApiError } from "../utils/ApiError";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = RegisterDto.parse(req.body);
    const { user, token } = await registerUser(data);

    res.cookie("token", token, cookieOptions);
    res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = LoginDto.parse(req.body);
    const { user, token } = await loginUser(data);

    res.cookie("token", token, cookieOptions);
    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.userId!);
    if (!user) throw ApiError.notFound("User not found");

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
