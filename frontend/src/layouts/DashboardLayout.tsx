import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";

export default function DashboardLayout() {
  const { user } = useAuth({ enabled: false });
  useSocket({ enabled: Boolean(user) });

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] overflow-hidden flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-10 flex items-center bg-transparent shrink-0">
          <Topbar />
        </header>

        <main className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
