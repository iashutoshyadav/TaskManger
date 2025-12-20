import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";
import { getSocket, connectSocket } from "@/lib/socket";
import { Task } from "@/types/task";

export const useSocket = () => {
  useEffect(() => {
    const socket = getSocket();
    connectSocket();

    const invalidateTasks = () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    socket.on("task:created", (_task: Task) => {
      invalidateTasks();
    });

    socket.on("task:updated", (_task: Task) => {
      invalidateTasks();
    });

    socket.on("task:deleted", () => {
      invalidateTasks();
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, []);
};
