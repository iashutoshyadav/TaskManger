import StatCard from "@/components/StatCard";
import TaskCard from "@/components/TaskCard";
import AlertCard from "@/components/AlertCard";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/types/task";

export default function Home() {
  const { user } = useAuth({ enabled: true });

  const {
    tasks,
    isLoading,
    deleteTask,
  } = useTasks({
    page: 1,
    limit: 20,
  });

  // ✅ FIX: explicitly typed
  const myTasks: Task[] = tasks;

  const inProgress = myTasks.filter(
    (t: Task) => t.status === "IN_PROGRESS"
  ).length;

  const review = myTasks.filter(
    (t: Task) => t.status === "REVIEW"
  ).length;

  const completed = myTasks.filter(
    (t: Task) => t.status === "COMPLETED"
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = myTasks.filter(
    (t: Task) =>
      Boolean(t.dueDate) &&
      new Date(t.dueDate) < today &&
      t.status !== "COMPLETED"
  ).length;

  const latestAssignedTask = myTasks
    .filter(
      (t: Task) => t.assignedToId?._id === user?.id
    )
    .sort(
      (a: Task, b: Task) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    )[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="In Progress" count={inProgress} />
        <StatCard title="Review" count={review} />
        <StatCard title="Completed" count={completed} />
        <StatCard title="My Tasks" count={myTasks.length} />
      </div>

      {/* Tasks + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Tasks
          </h2>

          {myTasks.length === 0 ? (
            <div className="bg-white border p-8 rounded-xl text-center text-gray-400">
              No tasks yet. Create your first task 🚀
            </div>
          ) : (
            myTasks.slice(0, 2).map((task: Task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() =>
                  console.log("Edit", task._id)
                }
                onDelete={() => {
                  if (confirm("Delete this task?")) {
                    deleteTask(task._id);
                  }
                }}
              />
            ))
          )}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">
                {myTasks.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                In Progress
              </span>
              <span className="font-semibold text-blue-600">
                {inProgress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                Review
              </span>
              <span className="font-semibold text-yellow-600">
                {review}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                Completed
              </span>
              <span className="font-semibold text-green-600">
                {completed}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">
                Overdue
              </span>
              <span className="font-semibold text-red-600">
                {overdue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-blue-50 border border-blue-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            Overview
          </h3>
          <p className="text-sm text-blue-800">
            You have <b>{inProgress}</b> tasks in
            progress, <b>{review}</b> under review,
            and <b>{overdue}</b> overdue tasks.
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
