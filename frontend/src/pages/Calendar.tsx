import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";

export default function Calendar() {
  const { tasks, isLoading, error } = useTasks({
    page: 1,
    limit: 50,
    filters: {}
  });

  if (isLoading) return <div className="p-6">Loading calendar...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load tasks</div>;


  const events = (tasks as Task[])
    .filter((task) => task.dueDate)
    .map((task) => ({
      id: task._id,
      title: task.title,
      date: task.dueDate!,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-gray-500">View tasks by due date</p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={500}
        />
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Upcoming Tasks</h2>

        {tasks.filter((t) => t.dueDate).length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming tasks</p>
        ) : (
          <ul className="space-y-2">
            {tasks
              .filter((t) => t.dueDate)
              .map((task) => (
                <li key={task._id}>
                  <b>{task.title}</b> —{" "}
                  {new Date(task.dueDate!).toDateString()}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
