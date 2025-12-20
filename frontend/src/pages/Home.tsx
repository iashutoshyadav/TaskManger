import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import AlertCard from "@/components/AlertCard";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth({ enabled: true });

  const userId = user?.id;

  const { tasks, isLoading, deleteTask } = useTasks({
    page: 1,
    limit: 20,
    filters: {},
  });

  /* ---------------- DERIVED DATA ---------------- */

  const myTasks = userId
    ? tasks.filter(
        (t) =>
          t.creatorId?._id === userId ||
          t.assignedToId?._id === userId
      )
    : [];

  const inProgress = myTasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;

  const review = myTasks.filter(
    (t) => t.status === "REVIEW"
  ).length;

  const completed = myTasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const overdue = myTasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED"
  ).length;

  const latestAssignedTask = myTasks
    .filter((t) => t.assignedToId?._id === userId)
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )[0];

  /* ------------------------------------------------ */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl">
          <StatCard title="In Progress" count={inProgress} />
        </div>
        <div className="bg-white border rounded-xl">
          <StatCard title="Review" count={review} />
        </div>
        <div className="bg-white border rounded-xl">
          <StatCard title="Completed" count={completed} />
        </div>
        <div className="bg-white border rounded-xl">
          <StatCard title="My Tasks" count={myTasks.length} />
        </div>
      </div>

      {/* ================= TASKS + SUMMARY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TASK LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Tasks
          </h2>

          {myTasks.length === 0 ? (
            <div className="bg-white border p-8 rounded-xl text-center text-gray-400">
              No tasks yet. Create your first task 🚀
            </div>
          ) : (
            myTasks.slice(0, 2).map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() =>
                  console.log("Edit clicked", task._id)
                }
                onDelete={() => deleteTask(task._id)}
              />
            ))
          )}
        </div>

        {/* SUMMARY */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total tasks</span>
              <span className="font-semibold">
                {myTasks.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">In progress</span>
              <span className="font-semibold text-blue-600">
                {inProgress}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Review</span>
              <span className="font-semibold text-yellow-600">
                {review}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Completed</span>
              <span className="font-semibold text-green-600">
                {completed}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Overdue</span>
              <span className="font-semibold text-red-600">
                {overdue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW + ALERT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-blue-50 border border-blue-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            Overview
          </h3>
          <p className="text-sm text-blue-800">
            You have <b>{inProgress}</b> tasks in progress,
            <b> {review}</b> under review, and
            <b> {overdue}</b> overdue tasks.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          {latestAssignedTask ? (
            <AlertCard
              title={`Task assigned: ${latestAssignedTask.title}`}
              time={new Date(
                latestAssignedTask.updatedAt ||
                  latestAssignedTask.createdAt
              ).toLocaleTimeString()}
            />
          ) : (
            <p className="text-sm text-gray-400">
              No new task assignments
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
