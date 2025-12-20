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
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskFilters,
} from "@/types/task";

interface UseTasksParams {
  page?: number;
  limit?: number;
  filters?: TaskFilters;
  all?: boolean; // 👈 for Summary
}

export const useTasks = ({
  page = 1,
  limit = 10,
  filters = {},
  all = false,
}: UseTasksParams = {}) => {
  const tasksQuery = useQuery<PaginatedTasks>({
    queryKey: ["tasks"], // ✅ SINGLE SOURCE OF TRUTH
    queryFn: () => getTasks({ page, limit, filters, all }),
    staleTime: 0,
  });

  const invalidateTasks = () =>
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: invalidateTasks,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: invalidateTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: invalidateTasks,
  });

  return {
    tasks: tasksQuery.data?.data ?? [],
    meta: tasksQuery.data?.meta,
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
  };
};
