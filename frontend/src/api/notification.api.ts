import api from "@/lib/api";

export interface Notification {
    _id: string;
    receiverId: string;
    type: "TASK_ASSIGNED" | "WORKSPACE_INVITE";
    taskId?: string;
    inviteId?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedNotifications {
    notifications: Notification[];
    total: number;
    count: number;
}

export const getNotifications = async (page = 1, limit = 10): Promise<PaginatedNotifications> => {
    const { data } = await api.get<PaginatedNotifications>("/notifications", {
        params: { page, limit },
    });
    return data;
};

export const markAsRead = async (id: string): Promise<Notification> => {
    const { data } = await api.patch<Notification>(`/notifications/${id}/read`);
    return data;
};

export const markAllAsRead = async (): Promise<void> => {
    await api.patch("/notifications/read-all");
};
