import StatCard from "./StatCard";
import AlertSummaryCard from "./AlertSummaryCard";

import StatusPieChart from "./StatusPieChart";
import PriorityBarChart from "./PriorityBarChart";
import { Task } from "@/types/task";

type Props = {
  tasks?: Task[]; // 👈 passed from parent
  variant?: "compact" | "full";
};

export default function SummaryPanel({
  tasks = [], // 👈 default prevents crash
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
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-6">
        <StatCard title="Total Tasks" count={total} />
        <StatCard title="Completed" count={completed} />
        <StatCard title="In Progress" count={inProgress} />
        <StatCard title="Overdue" count={overdue} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl p-6">
          <h2 className="font-semibold mb-4">
            Task Status Distribution
          </h2>
          <StatusPieChart tasks={tasks} />
        </div>

        {variant === "full" && (
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold mb-4">
              Priority Breakdown
            </h2>
            <PriorityBarChart tasks={tasks} />
          </div>
        )}
      </div>

      {variant === "full" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Overview</h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Total tasks created: <b>{total}</b></li>
              <li>• Tasks in progress: <b>{inProgress}</b></li>
              <li>• Completed tasks: <b>{completed}</b></li>
              <li>• Overdue tasks: <b>{overdue}</b></li>
            </ul>
          </div>
          <AlertSummaryCard
            title="Alerts"
            message={
              overdue > 0
                ? `${overdue} tasks are overdue.`
                : "No overdue tasks"
            }
          />


        </div>
      )}
    </div>
  );
}
