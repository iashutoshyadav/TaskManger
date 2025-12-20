import { Task } from "@/types/task";
type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete, }: Props) {
  const assignedUser =
    task.assignedToId?.name ?? "Unassigned";
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <div className="bg-white rounded-2xl p-5 w-full shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 truncate">
          {task.title}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600">
          {task.priority}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {task.description || "No description"}
      </p>

      {/* Footer */}
      <div className="flex justify-between text-xs text-gray-400">
        <span>Due: {dueDate}</span>
        <span>Assigned: {assignedUser}</span>
      </div>
    </div>
  );
}
