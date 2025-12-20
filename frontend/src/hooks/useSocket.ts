import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";
import { getSocket, connectSocket, disconnectSocket } from "@/lib/socket";
import { Task } from "@/types/task";

export const useSocket = ({ enabled }: { enabled: boolean }) => {
  useEffect(() => {
    if (!enabled) return;

    const socket = getSocket();
    connectSocket();

    const invalidateTasks = () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    socket.on("task:created", invalidateTasks);
    socket.on("task:updated", invalidateTasks);
    socket.on("task:deleted", invalidateTasks);

    return () => {
      socket.off("task:created", invalidateTasks);
      socket.off("task:updated", invalidateTasks);
      socket.off("task:deleted", invalidateTasks);
      disconnectSocket();
    };
  }, [enabled]);
};
