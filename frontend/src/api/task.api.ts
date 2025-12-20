import api from "@/lib/api";
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types/task";

/* ---------- GET ---------- */
export const getTasks = async (params: any) => {
  const { data } = await api.get("/tasks", { params });
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
