import axios from "axios";
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "@/types/task";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export interface PaginatedTasks {
  data: Task[];
  page?: number;
  limit?: number;
  total?: number;
}

type GetTasksParams = {
  page?: number;
  limit?: number;
  filters?: TaskFilters;
  all?: boolean; // 👈 important for Summary
};

export const getTasks = async ({
  page = 1,
  limit = 10,
  filters = {},
  all = false,
}: GetTasksParams): Promise<PaginatedTasks> => {
  const { data } = await api.get("/tasks", {
    params: {
      page,
      limit,
      ...filters,
      all, // 👈 backend uses this
    },
  });

  return data;
};

export const createTask = async (
  payload: CreateTaskPayload
): Promise<Task> => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTask = async (
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
