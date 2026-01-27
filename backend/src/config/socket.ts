import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import cookie from "cookie";
import { env } from "./env";
import { verifyToken } from "../utils/jwt";
import { logger } from "../utils/logger";
import * as messageService from "../services/message.service";
import { findUserById } from "../repositories/user.repository";

let io: Server;
export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        // "http://localhost:5173",
        env.clientUrl,
      ],
      credentials: true,
    },
  });
  io.use((socket: Socket, next) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        return next(new Error("No cookies sent"));
      }

      const parsed = cookie.parse(cookies);
      const token = parsed.token;

      if (!token) {
        return next(new Error("Auth token missing"));
      }
      const payload = verifyToken(token);
      socket.data.userId = payload.userId;
      findUserById(payload.userId).then(user => {
        if (user?.organizationId) {
          socket.data.organizationId = user.organizationId.toString();
        }
        next();
      }).catch(err => {
        logger.error("Socket user fetch error", err);
        next();
      });
    } catch (err) {
      logger.warn("Socket auth failed", err);
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.userId;
    const orgId = socket.data.organizationId;

    socket.join(userId);
    if (orgId) {
      socket.join(`org:${orgId}`);
      logger.info(`Socket joined org room: org:${orgId}`);
    }

    logger.info(`Socket connected: ${socket.id} (User ${userId})`);

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });

    /* ================= CHAT ================= */
    socket.on("chat:message", async (data: { text: string }) => {
      try {
        if (!data.text || !data.text.trim()) return;
        if (!orgId) return;
        const message = await messageService.saveMessage(userId, orgId, data.text);
        await message.populate("senderId", "name email");
        const payload = {
          id: message._id,
          text: message.content,
          senderId: message.senderId,
          createdAt: message.createdAt,
        };
        io.to(`org:${orgId}`).emit("chat:receive", payload);
      } catch (err) {
        logger.error("Chat message error", err);
      }
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
