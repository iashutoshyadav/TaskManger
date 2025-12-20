import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";

export default function Tasks() {
  const [params] = useSearchParams();
  const showForm = params.get("new") === "true";

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, isLoading, error, deleteTask } = useTasks({
    page: 1,
    limit: 20,
    filters: {},
  });

  const handleEdit = (task: Task) => {
    console.log("Edit clicked", task._id);
    setEditingTask(task);
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div className="text-red-500">Failed to load tasks</div>;

  return (
    <div className="space-y-8">
      {/* Create OR Edit form */}
      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask ?? undefined}
          onClose={() => setEditingTask(null)}
        />
      )}

      {!showForm && !editingTask && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.length === 0 ? (
            <div className="text-gray-500">No tasks found</div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}              
                onDelete={deleteTask}           
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
