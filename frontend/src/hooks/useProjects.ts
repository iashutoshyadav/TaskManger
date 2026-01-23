import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import * as projectApi from "@/api/project.api";
import { UpdateProjectPayload } from "@/types/project";

export const useProjects = (page = 1, limit = 10) => {
    const query = useQuery({
        queryKey: ["projects", page, limit],
        queryFn: () => projectApi.getProjects({ page, limit }),
        placeholderData: (prev) => prev,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

    const createMutation = useMutation({
        mutationFn: projectApi.createProject,
        onSuccess: invalidate,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectPayload }) =>
            projectApi.updateProject(id, payload),
        onSuccess: invalidate,
    });

    const deleteMutation = useMutation({
        mutationFn: projectApi.deleteProject,
        onSuccess: invalidate,
    });

    return {
        projects: query.data?.data || [],
        total: query.data?.total || 0,
        isLoading: query.isLoading,
        error: query.error,
        createProject: createMutation.mutateAsync,
        updateProject: updateMutation.mutateAsync,
        deleteProject: deleteMutation.mutateAsync,
        refetch: query.refetch,
    };
};

export const useProject = (id?: string) => {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => (id ? projectApi.getProjectById(id) : null),
        enabled: !!id,
    });
};
