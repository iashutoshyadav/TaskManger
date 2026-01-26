import api from "@/lib/api";

export interface MessageResponse {
    _id: string;
    senderId: {
        _id: string;
        name: string;
        email: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
}

export const getChatHistory = async (limit: number = 50): Promise<MessageResponse[]> => {
    const { data } = await api.get<MessageResponse[]>("/messages", {
        params: { limit },
    });
    return data;
};
