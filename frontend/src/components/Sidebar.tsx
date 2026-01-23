import { NavLink } from "react-router-dom";
import {
  Home,
  CheckSquare,
  MessageCircle,
  BarChart2,
  Calendar,
  Bell,
  User,
  Briefcase,
} from "lucide-react";

const base =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full";

const active = "bg-brand text-white shadow-lg shadow-brand/20";
const inactive = "text-slate-500 hover:bg-slate-100 hover:text-brand";

export default function Sidebar() {

  return (
    <aside className="w-72 h-screen bg-white flex flex-col border-r border-slate-200">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-8">
        <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/30">
          T
        </div>
        <span className="text-xl font-bold tracking-tight text-brand">
          Toko.io
        </span>
      </div>

      {/* SEARCH */}
      {/* <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full text-gray-600 placeholder-gray-400"
          />
        </div>
      </div> */}

      {/* MENU */}
      <nav className="flex flex-col gap-2 px-4 flex-1">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Home size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/projects"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Briefcase size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <CheckSquare size={18} />
          <span>My Tasks</span>
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MessageCircle size={18} />
          <span>AI Chat</span>
        </NavLink>

        <NavLink
          to="/dashboard/summary"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <BarChart2 size={18} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/dashboard/calendar"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Calendar size={18} />
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to="/dashboard/notifications"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Bell size={18} />
          <span>Notifications</span>
        </NavLink>

        <div className="mt-8 mb-2 px-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
        </div>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <User size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>


    </aside>
  );
}
