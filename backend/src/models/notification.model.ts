import mongoose, { Document, Schema } from "mongoose";

export enum NotificationType {
  TASK_ASSIGNED = "TASK_ASSIGNED",
  WORKSPACE_INVITE = "WORKSPACE_INVITE",
}

export interface INotification extends Document {
  receiverId: mongoose.Types.ObjectId;
  type: NotificationType;
  taskId?: mongoose.Types.ObjectId;
  inviteId?: mongoose.Types.ObjectId;
  inviteToken?: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
      default: NotificationType.TASK_ASSIGNED,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: false,
    },
    inviteId: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
      required: false,
    },
    inviteToken: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

NotificationSchema.index({ receiverId: 1, isRead: 1, createdAt: -1 });

export const NotificationModel = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
