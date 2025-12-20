import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/api/task.api";
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "@/types/task";

/* =====================
   TYPES
===================== */

interface PaginatedTasks {
  data: Task[];
  page: number;
  limit: number;
  total: number;
}

interface UseTasksParams {
  page?: number;
  limit?: number;
  filters?: TaskFilters;
}

/* =====================
   HOOK
===================== */

export const useTasks = ({
  page = 1,
  limit = 10,
  filters = {},
}: UseTasksParams = {}) => {
  /* ---------- QUERY ---------- */
  const tasksQuery = useQuery<PaginatedTasks>({
    queryKey: ["tasks"],
    queryFn: () =>
      getTasks({
        page,
        limit,
        filters,
      }),
    placeholderData: (prev) => prev,
  });

  /* ---------- INVALIDATE ---------- */
  const invalidateTasks = () =>
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });

  /* ---------- CREATE ---------- */
  const createMutation = useMutation<Task, Error, CreateTaskPayload>({
    mutationFn: createTask,
    onSuccess: invalidateTasks,
  });

  /* ---------- UPDATE ---------- */
  const updateMutation = useMutation<
    Task,
    Error,
    { id: string; payload: UpdateTaskPayload }
  >({
    mutationFn: ({ id, payload }) =>
      updateTask(id, payload),
    onSuccess: invalidateTasks,
  });

  /* ---------- DELETE ---------- */
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteTask,
    onSuccess: invalidateTasks,
  });

  return {
    tasks: tasksQuery.data?.data ?? [],
    total: tasksQuery.data?.total ?? 0,
    page: tasksQuery.data?.page ?? page,
    limit: tasksQuery.data?.limit ?? limit,

    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,

    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
  };
};
