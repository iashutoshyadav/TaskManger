import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatHistory } from "@/api/message.api";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

export const useMessages = (limit: number = 50) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["messages", limit],
        queryFn: () => getChatHistory(limit),
    });

    useEffect(() => {
        const socket = getSocket();

        const handleNewMessage = () => {
            // Invalidate query to refetch or update cache manually
            // For simplicity, we'll invalidate
            queryClient.invalidateQueries({ queryKey: ["messages"] });
        };

        socket.on("chat:receive", handleNewMessage);

        return () => {
            socket.off("chat:receive", handleNewMessage);
        };
    }, [queryClient]);

    return {
        messages: query.data ?? [],
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
    };
};
