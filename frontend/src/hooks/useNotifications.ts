import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    Notification,
} from "@/api/notification.api";

export const useNotifications = (page = 1, limit = 10) => {
    const queryClient = useQueryClient();

    // Query
    const { data, isLoading, error } = useQuery({
        queryKey: ["notifications", page, limit],
        queryFn: () => getNotifications(page, limit),
    });

    // Invalidations
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    // Mutations
    const markReadMutation = useMutation({
        mutationFn: markAsRead,
        onSuccess: invalidate,
    });

    const markAllReadMutation = useMutation({
        mutationFn: markAllAsRead,
        onSuccess: invalidate,
    });

    return {
        notifications: data?.notifications || [],
        total: data?.total || 0,
        count: data?.count || 0,
        isLoading,
        error,
        markAsRead: markReadMutation.mutate,
        markAllAsRead: markAllReadMutation.mutate,
    };
};
