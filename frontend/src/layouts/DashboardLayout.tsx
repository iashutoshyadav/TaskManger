import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout() {
  // ✅ DO NOT redirect here
  // ✅ Just read user from cache
  const { user } = useAuth({ enabled: false });

  // 🔌 Connect socket only when authenticated
  useSocket({ enabled: Boolean(user) });

  return (
    <div className="h-screen bg-gray-100 p-4 overflow-hidden">
      <div className="flex h-full gap-4">
        <Sidebar />

        <div className="flex-1 bg-white rounded-3xl flex flex-col overflow-hidden">
          <header className="h-20 px-8 flex items-center bg-gray-50 shrink-0">
            <Topbar />
          </header>

          <main className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
