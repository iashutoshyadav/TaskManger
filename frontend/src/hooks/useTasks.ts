import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  PaginatedTasks,
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
  const tasksQuery = useQuery<PaginatedTasks, Error>({
    queryKey: ["tasks", page, limit, filters],
    queryFn: () => getTasks({ page, limit, filters }),
    placeholderData: (prev) => prev,
  });

  /* ---------- INVALIDATE ---------- */
  const invalidateTasks = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  };

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
    mutationFn: ({ id, payload }) => {
      if (!id) throw new Error("Invalid task ID");
      return updateTask(id, payload);
    },
    onSuccess: invalidateTasks,
  });

  /* ---------- DELETE ---------- */
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (id) => {
      if (!id) throw new Error("Invalid task ID");
      return deleteTask(id);
    },
    onSuccess: invalidateTasks,
  });

  return {
    /* DATA */
    tasks: tasksQuery.data?.data ?? [],
    total: tasksQuery.data?.total ?? 0,
    page: tasksQuery.data?.page ?? page,
    limit: tasksQuery.data?.limit ?? limit,

    /* STATUS */
    isLoading: tasksQuery.isLoading,
    isFetching: tasksQuery.isFetching,
    error: tasksQuery.error,

    /* ACTIONS */
    createTask: createMutation.mutateAsync,
    updateTask: (id: string, payload: UpdateTaskPayload) =>
      updateMutation.mutateAsync({ id, payload }),
    deleteTask: deleteMutation.mutateAsync,

    /* EXTRA */
    refetch: tasksQuery.refetch, // ✅ FIX
  };
};
