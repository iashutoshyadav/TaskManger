import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  /* ======================
     API ERROR
  ====================== */
  if (err instanceof ApiError) {
    statusCode = err.status;
    message = err.message;
  }

  /* ======================
     ZOD VALIDATION
  ====================== */
  else if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  /* ======================
     MONGOOSE VALIDATION
  ====================== */
  else if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(err.errors).map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  /* ======================
     INVALID OBJECT ID
  ====================== */
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid ID format";
  }

  /* ======================
     DUPLICATE KEY
  ====================== */
  else if (err?.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  /* ======================
     LOGGING
  ====================== */
  if (statusCode >= 500) {
    logger.error(err.message, {
      statusCode,
      stack: err.stack,
    });
  } else {
    logger.warn(err.message, { statusCode });
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};

