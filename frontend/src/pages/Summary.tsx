import SummaryPanel from "@/components/SummaryPanel";
import { useTasks } from "@/hooks/useTasks";
import { TrendingUp, Calendar } from "lucide-react";

export default function Summary() {
  const { tasks, isLoading } = useTasks({
    page: 1,
    limit: 100,
    filters: {}
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-slate-400 font-medium">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 border-4 border-brand/20 rounded-full" />
            <div className="absolute top-0 h-16 w-16 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-lg animate-pulse">Aggregating workspace intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-brand text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-brand/30">
              Insight Engine
            </span>
            <div className="h-px w-12 bg-slate-200" />
            <div className="flex items-center gap-2.5 text-slate-400">
              <Calendar size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Q1 Analysis</span>
            </div>
          </div>
        </div>

        {/* Actions moved to Topbar */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2.5 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-widest border border-emerald-100 shadow-sm shadow-emerald-100/50">
            <TrendingUp size={14} />
            Growth Active
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Subtle Decorative Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <SummaryPanel
          tasks={tasks}
          variant="full"
        />
      </div>
    </div>
  );
}
