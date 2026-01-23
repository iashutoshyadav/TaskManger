import mongoose from "mongoose";
import * as repo from "../repositories/notification.repository";
import { getIO } from "../config/socket";
import { INotification } from "../models/notification.model";
import { ApiError } from "../utils/ApiError";

/* ===========================
   CREATE (TASK ASSIGNMENT)
=========================== */
export const notifyTaskAssignment = async (
  receiverId: string,
  taskId: string,
  taskTitle: string
): Promise<INotification> => {
  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(taskId)
  ) {
    throw ApiError.badRequest("Invalid ID");
  }

  const notification = await repo.createNotification({
    receiverId: new mongoose.Types.ObjectId(receiverId),
    taskId: new mongoose.Types.ObjectId(taskId),
    message: `You have been assigned a new task: "${taskTitle}"`,
  });

  getIO().to(receiverId).emit("notification:new", {
    id: notification._id,
    taskId,
    message: notification.message,
    createdAt: notification.createdAt,
  });

  return notification;
};

/* ===========================
   GET NOTIFICATIONS
=========================== */
export const getUserNotifications = async (
  userId: string,
  page: number,
  limit: number
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw ApiError.badRequest("Invalid user ID");
  }

  return repo.getNotificationsByUser(userId, page, limit);
};

export const getUnreadUserNotifications = async (
  userId: string,
  page: number,
  limit: number
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw ApiError.badRequest("Invalid user ID");
  }

  return repo.getUnreadNotificationsByUser(userId, page, limit);
};

/* ===========================
   MARK READ
=========================== */
export const markNotificationRead = async (
  notificationId: string,
  userId: string
): Promise<INotification> => {
  const notification = await repo.findNotificationById(notificationId);

  if (!notification) {
    throw ApiError.notFound("Notification not found");
  }

  if (notification.receiverId.toString() !== userId) {
    throw ApiError.forbidden();
  }

  return (await repo.markNotificationAsRead(
    notificationId
  ))!;
};

export const markAllNotificationsRead = async (
  userId: string
): Promise<void> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw ApiError.badRequest("Invalid user ID");
  }

  await repo.markAllNotificationsAsRead(userId);
};
