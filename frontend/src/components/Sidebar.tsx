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
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import InviteModal from "./InviteModal";

const base =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 w-full";

const active = "bg-brand text-white shadow-lg shadow-brand/20";
const inactive = "text-slate-500 hover:bg-slate-100 hover:text-brand";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export default function Sidebar({ className = "", onClose }: SidebarProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`w-72 h-screen bg-white flex flex-col border-r border-slate-200 ${className}`}>
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 pt-8 pb-8">
        <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/30">
          T
        </div>
        <span className="text-xl font-bold tracking-tight text-brand">
          Toko
        </span>
      </div>
      {/* MENU */}
      <nav className="flex flex-col gap-2 px-4 flex-1">
        <NavLink
          to="/dashboard"
          end
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Home size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard/projects"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Briefcase size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/dashboard/tasks"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <CheckSquare size={18} />
          <span>My Tasks</span>
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <MessageCircle size={18} />
          <span>Team Chat</span>
        </NavLink>

        <NavLink
          to="/dashboard/summary"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <BarChart2 size={18} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/dashboard/calendar"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <Calendar size={18} />
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to="/dashboard/notifications"
          onClick={handleLinkClick}
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
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <User size={18} />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={() => setShowInviteModal(true)}
          className={`${base} text-slate-500 hover:bg-slate-100 hover:text-brand mt-4 border border-dashed border-slate-200`}
        >
          <UserPlus size={18} />
          <span>Invite Member</span>
        </button>
      </nav>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </aside>
  );
}
