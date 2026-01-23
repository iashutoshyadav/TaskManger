import mongoose from "mongoose";
import * as repo from "../repositories/task.repository";
import { getIO } from "../config/socket";
import { TaskStatus, TaskPriority } from "../models/task.model";
import { CreateTaskInput, UpdateTaskInput } from "../dtos/task.dto";
import { ApiError } from "../utils/ApiError";

/* ================= UTIL ================= */

const getObjectId = (
  value: mongoose.Types.ObjectId | { _id: mongoose.Types.ObjectId }
): string => {
  return value instanceof mongoose.Types.ObjectId
    ? value.toString()
    : value._id.toString();
};

/* ================= CREATE ================= */

export const createNewTask = async (
  input: CreateTaskInput,
  userId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw ApiError.badRequest("Invalid user ID");
  }

  if (!input.dueDate) {
    throw ApiError.badRequest("Due date is required");
  }

  const dueDate = new Date(input.dueDate);
  if (isNaN(dueDate.getTime())) {
    throw ApiError.badRequest("Invalid due date");
  }

  let assignedToId: mongoose.Types.ObjectId | null = null;
  if (input.assignedToId) {
    const id = typeof input.assignedToId === 'string' ? input.assignedToId : input.assignedToId._id;
    assignedToId = new mongoose.Types.ObjectId(id);
  }

  const task = await repo.createTask({
    title: input.title,
    description: input.description,
    priority: input.priority || TaskPriority.MEDIUM,
    status: TaskStatus.PENDING,
    dueDate,
    creatorId: new mongoose.Types.ObjectId(userId),
    assignedToId,
  });

  const io = getIO();
  io.to(userId).emit("task:created", task);

  if (assignedToId) {
    io.to(assignedToId.toString()).emit("task:assigned", task);
  }

  return task;
};

/* ================= UPDATE ================= */

export const updateTask = async (
  taskId: string,
  input: UpdateTaskInput,
  userId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw ApiError.badRequest("Invalid task ID");
  }

  const task = await repo.getTaskById(taskId);
  if (!task) throw ApiError.notFound("Task not found");

  const creatorId = getObjectId(task.creatorId);
  const assignedId = task.assignedToId
    ? getObjectId(task.assignedToId)
    : null;

  const canUpdate =
    creatorId === userId || assignedId === userId;

  if (!canUpdate) {
    throw ApiError.forbidden("You do not have permission to perform this action");
  }

  const updateData: any = {};

  if (input.title !== undefined) updateData.title = input.title;
  if (input.description !== undefined)
    updateData.description = input.description;
  if (input.priority !== undefined)
    updateData.priority = input.priority;
  if (input.status !== undefined)
    updateData.status = input.status;

  if (input.dueDate !== undefined && input.dueDate !== null) {
    const date = new Date(input.dueDate);
    if (isNaN(date.getTime())) {
      throw ApiError.badRequest("Invalid due date");
    }
    updateData.dueDate = date;
  } else if (input.dueDate === null) {
    updateData.dueDate = null;
  }

  if ("assignedToId" in input) {
    if (input.assignedToId) {
      const id = typeof input.assignedToId === 'string' ? input.assignedToId : input.assignedToId._id;
      updateData.assignedToId = new mongoose.Types.ObjectId(id);
    } else {
      updateData.assignedToId = null;
    }
  }

  const updated = await repo.updateTaskById(
    taskId,
    updateData
  );

  const io = getIO();
  io.to(creatorId).emit("task:updated", updated);
  if (assignedId) {
    io.to(assignedId).emit("task:updated", updated);
  }

  return updated;
};

/* ================= DELETE ================= */

export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  const task = await repo.getTaskById(taskId);
  if (!task) throw ApiError.notFound("Task not found");

  const creatorId = getObjectId(task.creatorId);
  const assignedId = task.assignedToId
    ? getObjectId(task.assignedToId)
    : null;

  const canDelete = creatorId === userId; // Usually only creator can delete

  if (!canDelete) {
    throw ApiError.forbidden("You do not have permission to delete this task");
  }

  await repo.deleteTaskById(taskId);

  const io = getIO();
  io.to(creatorId).emit("task:deleted", taskId);
  if (assignedId) {
    io.to(assignedId).emit("task:deleted", taskId);
  }
};

/* ================= FETCH ================= */

export const fetchTasks = async ({
  userId,
  status,
  priority,
  page,
  limit,
}: {
  userId: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  page: number;
  limit: number;
}) => {
  const { tasks, total } = await repo.findTasksForUser({
    userId,
    status,
    priority,
    page,
    limit,
  });

  return { tasks, total };
};
