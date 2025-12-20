import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";
import { getSocket, connectSocket } from "@/lib/socket";

export const useSocket = ({ enabled }: { enabled: boolean }) => {
  useEffect(() => {
    if (!enabled) return;

    const socket = getSocket();
    connectSocket();

    const invalidateTasks = () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

    const invalidateNotifications = () =>
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

    socket.on("task:created", invalidateTasks);
    socket.on("task:updated", invalidateTasks);
    socket.on("task:deleted", invalidateTasks);

    socket.on("notification:new", invalidateNotifications);

    return () => {
      socket.off("task:created", invalidateTasks);
      socket.off("task:updated", invalidateTasks);
      socket.off("task:deleted", invalidateTasks);
      socket.off("notification:new", invalidateNotifications);
      // ❌ DO NOT disconnect socket globally
    };
  }, [enabled]);
};
