import { useMutation, useQuery } from "@tanstack/react-query";
import * as aiApi from "@/api/ai.api";
import { queryClient } from "@/lib/queryClient";

export const useAI = () => {
    const magicWorkspaceMutation = useMutation({
        mutationFn: (goal: string) => aiApi.generateMagicWorkspace(goal),
        onSuccess: () => {
            // Invalidate projects and tasks to show new data
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    const standupQuery = useQuery({
        queryKey: ["ai-standup"],
        queryFn: aiApi.getDailyStandup,
        staleTime: 1000 * 60 * 30, // 30 minutes cache
    });

    const enhanceTaskMutation = useMutation({
        mutationFn: (title: string) => aiApi.enhanceTask(title),
    });

    return {
        generateMagicWorkspace: magicWorkspaceMutation.mutateAsync,
        isGenerating: magicWorkspaceMutation.isPending,
        standup: standupQuery.data?.summary || "",
        isLoadingStandup: standupQuery.isLoading,
        refetchStandup: standupQuery.refetch,
        enhanceTask: enhanceTaskMutation.mutateAsync,
        isEnhancing: enhanceTaskMutation.isPending
    };
};
