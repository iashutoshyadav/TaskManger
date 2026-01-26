import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "@/api/project.api";
import { Project, UpdateProjectPayload } from "@/types/project";

export const useProjects = (page = 1, limit = 10) => {
    const query = useQuery({
        queryKey: ["projects", page, limit],
        queryFn: () => getProjects({ page, limit }),
        placeholderData: (prev) => prev,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: invalidate,
    });

    const updateMutation = useMutation<
        Project,
        Error,
        { id: string; payload: UpdateProjectPayload }
    >({
        mutationFn: ({ id, payload }) => updateProject(id, payload),
        onSuccess: invalidate,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: invalidate,
    });

    return {
        projects: query.data?.data || [],
        total: query.data?.total || 0,
        isLoading: query.isLoading,
        error: query.error,
        createProject: createMutation.mutateAsync,
        updateProject: (id: string, payload: UpdateProjectPayload) =>
            updateMutation.mutateAsync({ id, payload }),
        deleteProject: deleteMutation.mutateAsync,
        refetch: query.refetch,
    };
};

export const useProject = (id?: string) => {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => (id ? getProjectById(id) : null),
        enabled: !!id,
    });
};

async function getProjectById(id: string) {
    const { getProjectById: fetchProject } = await import("@/api/project.api");
    return fetchProject(id);
}
