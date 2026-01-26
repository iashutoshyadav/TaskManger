import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function DashboardLayout() {
  const { user } = useAuth({ enabled: false });
  useSocket({ enabled: Boolean(user) });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] overflow-hidden flex relative">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar className="h-full" />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="h-full w-72 bg-white animate-in slide-in-from-left duration-300 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-brand"
              >
                <X size={20} />
              </button>
            </div>
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 h-full relative z-0">
        <header className="h-20 px-4 md:px-10 flex items-center bg-transparent shrink-0 gap-4">
          <button
            className="md:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-500 shadow-sm"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1">
            <Topbar />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
