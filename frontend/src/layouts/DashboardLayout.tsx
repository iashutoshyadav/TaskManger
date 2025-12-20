import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth.api";
import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout() {
  const { data: me, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false, // ✅ IMPORTANT: avoid retrying 401
  });

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  // 🔒 Not logged in → redirect
  if (!me) {
    return <Navigate to="/login" replace />;
  }

  // 🔌 Connect socket ONLY when authenticated
  useSocket();

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-hidden">
      <div className="flex h-full gap-4">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="flex-1 bg-white rounded-3xl flex flex-col overflow-hidden">
          
          {/* Topbar */}
          <header className="h-20 px-8 flex items-center bg-gray-50 shrink-0">
            <Topbar />
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
