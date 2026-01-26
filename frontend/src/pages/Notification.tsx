import { useEffect, useState } from "react";
import AlertCard from "@/components/AlertCard";
import { useNotifications } from "@/hooks/useNotifications";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import JoinWorkspaceModal from "@/components/JoinWorkspaceModal";

export default function Notifications() {
  const queryClient = useQueryClient();

  const {
    notifications,
    isLoading,
    error,
    markAsRead
  } = useNotifications();
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // Real-time updates
  useEffect(() => {
    const socket = getSocket();

    const handleNewNotification = () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [queryClient]);

  const handleNotificationClick = (note: any) => {
    if (!note.isRead) markAsRead(note._id);

    if (note.type === "WORKSPACE_INVITE" && note.inviteToken) {
      setSelectedToken(note.inviteToken);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-slate-500">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-rose-500">
        Failed to load notifications
      </div>
    );
  }

  // Group by date (Today vs Earlier) logic could be added here
  // For now, let's show them in a simple list

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-slate-800">Your Notifications</h2>
        </div>

        {notifications.length === 0 ? (
          <div className="text-slate-400 text-sm py-8 text-center italic">
            You are all caught up! No new notifications. 🔔
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((note) => (
              <div
                key={note._id}
                onClick={() => handleNotificationClick(note)}
              >
                <AlertCard
                  title={note.message}
                  time={new Date(note.createdAt).toLocaleString()}
                  type={note.type}
                  isRead={note.isRead}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedToken && (
        <JoinWorkspaceModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  );
}
