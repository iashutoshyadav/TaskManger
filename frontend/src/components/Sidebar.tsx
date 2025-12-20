import { NavLink } from "react-router-dom";
import {
  Home,
  CheckSquare,
  MessageCircle,
  BarChart2,
  Calendar,
  Bell,
  User,
} from "lucide-react";

const base =
  "flex items-center gap-4 px-5 py-3 rounded-2xl font-medium transition w-full";

const active = "bg-purple-500 text-white shadow-md";
const inactive = "text-purple-100 hover:bg-white/10";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full rounded-3xl bg-gradient-to-b from-[#2a1b3d] to-[#3b1d5c] p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-11 w-11 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <span className="text-xl font-semibold text-white">
          Toko
        </span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Home size={20} />
          Home
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <CheckSquare size={20} />
          Tasks
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MessageCircle size={20} />
          Chat
        </NavLink>

        <NavLink
          to="/dashboard/summary"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <BarChart2 size={20} />
          Summary
        </NavLink>

        <NavLink
          to="/dashboard/calendar"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Calendar size={20} />
          Calendar
        </NavLink>

        <NavLink
          to="/dashboard/notifications"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Bell size={20} />
          Notifications
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
