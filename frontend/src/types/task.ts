/* -------- Enums -------- */

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "REVIEW"
  | "COMPLETED";

/* -------- Shared Types -------- */

export interface UserRef {
  _id: string;
  name?: string;
  email?: string;
}

/* -------- Task -------- */

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;

  creatorId: UserRef;
  assignedToId?: UserRef | null;

  createdAt: string;
  updatedAt: string;
}

/* -------- API Payloads -------- */

export interface CreateTaskPayload {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  assignedToId: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assignedToId?: string | null;
}

/* -------- Filters -------- */

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface PaginatedTasks {
  data: Task[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

