import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import notificationRoutes from "./routes/notification.routes";
import projectRoutes from "./routes/project.routes";
import messageRoutes from "./routes/message.routes";
import invitationRoutes from "./routes/invitation.routes";
import aiRoutes from "./routes/ai.routes";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  process.env.CLIENT_URL,      // https://www.tokoai.in
  "https://tokoai.in",

  // "http://localhost:4000",
  // "http://localhost:4173",
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // IMPORTANT: still allow so CORS headers are sent
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

if (env.nodeEnv !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/invitations", invitationRoutes);
app.use("/api/v1/ai", aiRoutes);

app.use(errorMiddleware);

export default app;
