import mongoose, { Schema, Document } from "mongoose";

/* ================= ENUMS ================= */

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED",
}

/* ================= POPULATED USER ================= */

export interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
}

/* ================= TASK INTERFACE ================= */

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;

  creatorId: mongoose.Types.ObjectId | PopulatedUser;
  assignedToId: mongoose.Types.ObjectId | PopulatedUser | null;

  createdAt: Date;
  updatedAt: Date;
}

/* ================= SCHEMA ================= */

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    assignedToId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<ITask>(
  "Task",
  TaskSchema
);
