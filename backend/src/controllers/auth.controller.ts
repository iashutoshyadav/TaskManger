import { Request, Response, NextFunction } from "express";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";
import { registerUser, loginUser } from "../services/auth.services";
import { AuthRequest } from "../middlewares/auth.middleware";
import { verifyToken, signAccessToken } from "../utils/jwt";
import { findUserById } from "../repositories/user.repository";
import { env } from "../config/env";
import { CookieOptions } from "express";
import { ApiError } from "../utils/ApiError";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "none" : "lax",
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = RegisterDto.parse(req.body);
    const { user, accessToken, refreshToken } = await registerUser(data);

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(201).json({ user, accessToken });
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = LoginDto.parse(req.body);
    const { user, accessToken, refreshToken } = await loginUser(data);

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(200).json({ user, accessToken });
  } catch (e) {
    next(e);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw ApiError.unauthorized("Refresh token not found");
    }

    // Verify
    const payload = verifyToken(refreshToken);
    if (!payload?.userId) {
      throw ApiError.unauthorized("Invalid refresh token");
    }

    // Issue new access token
    const accessToken = signAccessToken(payload.userId);

    res.status(200).json({ accessToken });
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
  res.clearCookie("refreshToken", {
    ...cookieOptions,
    expires: new Date(0), // expire immediately
  });

  res.status(200).json({ message: "Logged out successfully" });
};
