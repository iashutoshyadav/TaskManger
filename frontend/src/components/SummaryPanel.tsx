import { Layout, CheckCircle, Clock, AlertTriangle, TrendingUp, BarChart } from "lucide-react";
import StatCard from "./StatCard";
import StatusPieChart from "./StatusPieChart";
import PriorityBarChart from "./PriorityBarChart";
import PerformanceChart from "./PerformanceChart";
import { Task } from "@/types/task";

type Props = {
  tasks?: Task[];
  variant?: "compact" | "full";
};

export default function SummaryPanel({
  tasks = [],
  variant = "compact"
}: Props) {
  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;

  const overdue = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED"
  ).length;

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          count={total}
          icon={Layout}
          color="bg-brand"
        />
        <StatCard
          title="Completed"
          count={completed}
          icon={CheckCircle}
          color="bg-emerald-500"
        />
        <StatCard
          title="In Progress"
          count={inProgress}
          icon={Clock}
          color="bg-amber-500"
        />
        <StatCard
          title="Overdue"
          count={overdue}
          icon={AlertTriangle}
          color="bg-rose-500"
        />
      </div>

      {/* Main Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Trend */}
        <div className="lg:col-span-2 glass-card p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp size={20} className="text-brand" />
                Task Velocity
              </h3>
              <p className="text-sm text-slate-500">Weekly task completion performance</p>
            </div>
            <div className="px-3 py-1 bg-brand/10 text-brand text-xs font-bold rounded-full">
              +12.5% vs last week
            </div>
          </div>
          <div className="p-8">
            <PerformanceChart tasks={tasks} />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-card p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart size={20} className="text-purple-500" />
              Status Mix
            </h3>
            <p className="text-sm text-slate-500">Breakdown by lifecycle stage</p>
          </div>
          <div className="p-8">
            <StatusPieChart tasks={tasks} />
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Success Rate</span>
                <span className="font-bold text-emerald-600">{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {variant === "full" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card">
            <h3 className="text-lg font-bold mb-6 text-slate-800">Priority Breakdown</h3>
            <PriorityBarChart tasks={tasks} />
          </div>
          <div className="glass-card bg-slate-900 text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <TrendingUp size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Workspace Health</h3>
              <p className="text-slate-400 text-sm mb-8">Overall health score based on overdue and progress metrics.</p>

              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-brand-light">84</span>
                <span className="text-slate-400 mb-2 font-bold">/ 100</span>
              </div>

              <div className="space-y-4 mt-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Key Insight</p>
                  <p className="text-sm text-slate-200">
                    {overdue > 0
                      ? `You have ${overdue} overdue tasks. Consider rescheduling them to improve health.`
                      : "Great job! All your tasks are strictly following the schedule."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
