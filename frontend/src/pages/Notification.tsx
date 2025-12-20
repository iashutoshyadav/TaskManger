import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import { useTasks } from "@/hooks/useTasks";
import { getSocket } from "@/lib/socket"; // your existing socket setup

interface Notification {
  id: string;
  title: string;
  time: string;
}

export default function Notifications() {
  const { tasks, isLoading, error } = useTasks({
    page: 1,
    limit: 50,
    filters: {}
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("task:assigned", (payload) => {
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          title: `Task assigned: ${payload.title}`,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    });

    socket.on("task:status-updated", (payload) => {
      setNotifications((prev) => [
        {
          id: crypto.randomUUID(),
          title: `Task status updated: ${payload.title}`,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);
    });

    return () => {
      socket.off("task:assigned");
      socket.off("task:status-updated");
    };
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load notifications
      </div>
    );
  }

  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-gray-500">
          Stay updated with task activities and alerts
        </p>
      </div>

      {/* Today Alerts */}
      <div className="bg-white rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">Today</h2>

        {notifications.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No notifications for today
          </div>
        ) : (
          notifications.map((alert) => (
            <AlertCard
              key={alert.id}
              title={alert.title}
              time={alert.time}
            />
          ))
        )}
      </div>

      {/* Overdue Tasks */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Overdue Tasks</h2>

        {overdueTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No overdue tasks
          </p>
        ) : (
          <ul className="space-y-2 text-gray-600">
            {overdueTasks.map((task) => (
              <li key={task._id}>
                • <b>{task.title}</b> is overdue
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
