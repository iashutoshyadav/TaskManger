import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/types/task";
import { Play, Pause, Square, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { tasks, isLoading } = useTasks({ page: 1, limit: 20 });

  const myTasks: Task[] = tasks || [];

  const completed = myTasks.filter(t => t.status === "COMPLETED").length;
  const inProgress = myTasks.filter(t => t.status === "IN_PROGRESS").length;
  const pending = myTasks.filter(t => t.status === "PENDING").length;

  const progress =
    myTasks.length === 0
      ? 0
      : Math.round((completed / myTasks.length) * 100);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400 font-medium">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
          Optimizing your workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">


      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand text-white rounded-3xl p-6 shadow-xl shadow-brand/20 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 bg-white/10 h-24 w-24 rounded-full group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/70">Total Tasks</p>
            <h2 className="text-5xl font-bold mt-2">{myTasks.length}</h2>
            <div className="flex items-center gap-2 mt-4 text-xs font-medium bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
              <TrendingUp size={12} />
              <span>{progress}% completion rate</span>
            </div>
          </div>
        </div>

        {[
          { title: "Finished", value: completed, icon: <CheckCircle2 className="text-emerald-500" />, label: "Tasks done" },
          { title: "Running", value: inProgress, icon: <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />, label: "In execution" },
          { title: "Pending", value: pending, icon: <Clock className="text-amber-500" size={16} />, label: "Waiting" },
        ].map((item, i) => (
          <div
            key={i}
            className="glass-card flex flex-col justify-between group hover:border-brand/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{item.title}</p>
                <h2 className="text-3xl font-bold mt-1 text-slate-800">{item.value}</h2>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-brand/5 transition-colors">
                {item.icon}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1 font-medium italic">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================= MIDDLE ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= ANALYTICS ================= */}
        <div className="lg:col-span-2 glass-card">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Productivity Index</h3>
              <p className="text-sm text-slate-500">Weekly project throughput</p>
            </div>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="relative h-64">
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="border-t border-slate-100"
                />
              ))}
            </div>

            <div className="relative z-10 flex items-end justify-between h-full px-4">
              {[
                { d: "Mon", h: "45%", t: "plan" },
                { d: "Tue", h: "70%", t: "done" },
                { d: "Wed", h: "55%", t: "prog" },
                { d: "Thu", h: "85%", t: "done" },
                { d: "Fri", h: "65%", t: "prog" },
                { d: "Sat", h: "40%", t: "plan" },
                { d: "Sun", h: "30%", t: "plan" },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full group">
                  <div className="relative h-48 w-full flex items-end justify-center">
                    <div
                      className={`w-10 rounded-t-xl transition-all duration-500 group-hover:w-12 ${b.t === 'done' ? 'bg-brand shadow-lg shadow-brand/20' :
                        b.t === 'prog' ? 'bg-accent' : 'bg-slate-200'
                        }`}
                      style={{ height: b.h }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {b.h}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{b.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= SIDE PANEL (REMINDERS & TRACKER) ================= */}
        <div className="space-y-6">
          <div className="glass-card bg-brand text-white border-none shadow-xl shadow-brand/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Clock size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold opacity-70 uppercase tracking-widest text-[10px]">Active Tracker</h3>
              <h2 className="text-4xl font-mono font-bold mt-4 tracking-tighter">01:24:08</h2>
              <p className="text-sm font-medium opacity-60 mt-1">Design System Sync</p>

              <div className="flex gap-3 mt-8">
                <button className="flex-1 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors">
                  <Pause size={20} />
                </button>
                <button className="flex-1 h-12 bg-rose-500 hover:bg-rose-600 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-rose-500/20">
                  <Square size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
              Latest Tasks
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full uppercase">Recent</span>
            </h3>
            <div className="space-y-4">
              {myTasks.slice(0, 3).map((task, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-white ${task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-brand'
                    }`}>
                    {task.status === 'COMPLETED' ? <CheckCircle2 size={20} /> : <Play size={18} fill="currentColor" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-brand transition-colors">{task.title}</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                    </p>
                  </div>
                </div>
              ))}
              {myTasks.length === 0 && (
                <div className="text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-medium text-slate-400">No active tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
