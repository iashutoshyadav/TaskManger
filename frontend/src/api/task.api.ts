import api from "@/lib/api";
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "@/types/task";

export interface PaginatedTasks {
  data: Task[];
  page: number;
  limit: number;
  total: number;
}

/* ---------- GET ---------- */
export const getTasks = async (params: {
  page: number;
  limit: number;
  filters: TaskFilters;
}): Promise<PaginatedTasks> => {
  const { data } = await api.get<PaginatedTasks>("/tasks", {
    params: {
      page: params.page,
      limit: params.limit,
      ...params.filters,
    },
  });
  return data;
};

/* ---------- CREATE ---------- */
export const createTask = async (
  payload: CreateTaskPayload
): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", payload);
  return data;
};

/* ---------- UPDATE ---------- */
export const updateTask = async (
  id: string,
  payload: UpdateTaskPayload
): Promise<Task> => {
  const { data } = await api.put<Task>(
    `/tasks/${id}`,
    payload
  );
  return data;
};

/* ---------- DELETE ---------- */
export const deleteTask = async (
  id: string
): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
