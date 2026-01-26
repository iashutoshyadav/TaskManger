import { Bell, Sparkles, CheckCircle2, Package } from "lucide-react";

type Props = {
  title: string;
  time: string;
  type?: "TASK_ASSIGNED" | "WORKSPACE_INVITE";
  isRead?: boolean;
}

export default function AlertCard({ title, time, type, isRead }: Props) {
  const getIcon = () => {
    switch (type) {
      case "WORKSPACE_INVITE":
        return <Sparkles className="text-amber-500" size={20} />;
      case "TASK_ASSIGNED":
        return <Package className="text-brand" size={20} />;
      default:
        return <Bell className="text-slate-400" size={20} />;
    }
  };

  const getBadge = () => {
    if (type === "WORKSPACE_INVITE") {
      return (
        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-tighter border border-amber-100/50">
          Invite
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-tighter border border-slate-100">
        Task
      </span>
    );
  };

  return (
    <div
      className={`
        group relative flex items-start gap-4 p-5 rounded-2xl transition-all duration-300
        ${!isRead
          ? 'bg-white shadow-xl shadow-brand/5 border-l-4 border-l-brand'
          : 'bg-white/50 border border-slate-100 opacity-80 hover:opacity-100 hover:bg-white'
        }
        hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-0.5
      `}
    >
      {/* ICON CONTAINER */}
      <div className={`
        flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center 
        ${!isRead ? 'bg-brand/5 shadow-inner' : 'bg-slate-50'}
        group-hover:scale-110 transition-transform duration-500
      `}>
        {getIcon()}
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {getBadge()}
          {!isRead && (
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          )}
        </div>

        <h3 className={`text-sm leading-relaxed ${!isRead ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
          {title}
        </h3>

        <p className="mt-2 text-[10px] font-medium text-slate-400 flex items-center gap-1">
          <CheckCircle2 size={10} />
          {time}
        </p>
      </div>

      {/* HOVER INDICATOR */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
