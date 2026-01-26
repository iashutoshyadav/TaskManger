import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useAuth } from "@/hooks/useAuth";

export default function Tasks() {
  const [params] = useSearchParams();
  const showForm = params.get("new") === "true";

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    tasks,
    isLoading,
    error,
    deleteTask,
  } = useTasks({
    page: 1,
    limit: 20,
    filters: {
      projectId: params.get("projectId") || undefined,
    }
  });

  const { user } = useAuth({ enabled: false });

  const myTasks: Task[] = tasks;

  if (isLoading) {
    return (
      <div className="text-gray-500">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load tasks
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Tasks
        </h1>
      </div> */}

      {/* Create / Edit Form */}
      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask ?? undefined}
          onClose={() => setEditingTask(null)}
        />
      )}

      {/* Task List */}
      {!showForm && !editingTask && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myTasks.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No tasks found. Create your first task 🚀
            </div>
          ) : (
            myTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => setEditingTask(t)}
                canDelete={user?.role === "ADMIN" || task.creatorId._id === user?.id}
                onDelete={(id) => {
                  if (confirm("Delete this task?")) {
                    deleteTask(id);
                  }
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
