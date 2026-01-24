import { useNavigate, useLocation, Link } from "react-router-dom";
import { Search, Bell, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth({ enabled: false });

  const getTitle = () => {
    if (location.pathname === "/dashboard") return `Welcome back, ${user?.name?.split(' ')[0] || 'Partner'}! 👋`;
    if (location.pathname.includes("/dashboard/projects")) return "Projects Portfolio";
    if (location.pathname.includes("/dashboard/tasks")) return "Task Management";
    if (location.pathname.includes("/dashboard/chat")) return "AI Assistant";
    if (location.pathname.includes("/dashboard/summary")) return "Analytics Overview";
    if (location.pathname.includes("/dashboard/calendar")) return "Schedule";
    if (location.pathname.includes("/dashboard/notifications")) return "Notifications";
    if (location.pathname.includes("/dashboard/profile")) return "Account Settings";
    return "Dashboard";
  };

  return (
    <div className="w-full flex items-center justify-between py-4">
      {/* LEFT */}
      <div className="animate-in slide-in-from-left duration-500">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {getTitle()}
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl group focus-within:border-brand transition-colors">
          <Search size={16} className="text-slate-400 group-focus-within:text-brand" />
          <input
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-sm w-48 font-medium placeholder-slate-400"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand hover:border-brand transition-all">
            <Bell size={20} />
          </button>

          <Link
            to="/dashboard/profile"
            aria-label="Go to profile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-11 w-11 rounded-full bg-brand  flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand/20 border-2 border-white ring-1 ring-slate-100">
              {user?.name?.[0] || 'A'}
            </div>
          </Link>
        </div>

        {/* Create Button */}
        <button
          onClick={() => {
            if (location.pathname.includes("/dashboard/projects")) {
              navigate("/dashboard/projects?new=true");
            } else if (location.pathname.includes("/dashboard/calendar")) {
              // No action for now
            } else {
              navigate("/dashboard/tasks/new");
            }
          }}
          className="btn-primary flex items-center gap-2"
        >
          {location.pathname.includes("/dashboard/projects") ? (
            "+ Establish Project"
          ) : location.pathname.includes("/dashboard/summary") ? (
            <>
              <Download size={18} />
              Export Data
            </>
          ) : location.pathname.includes("/dashboard/calendar") ? (
            "Schedule Task"
          ) : (
            "+ New Task"
          )}
        </button>
      </div>
    </div>
  );
}
