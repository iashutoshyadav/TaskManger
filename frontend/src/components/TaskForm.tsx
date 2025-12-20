import { useEffect, useState } from "react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

type Props = {
  task?: Task;
  onClose: () => void;
};

export default function TaskForm({ task, onClose }: Props) {
  const isEdit = Boolean(task);
  const { createTask, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("LOW");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate?.slice(0, 10) ?? "");
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      if (isEdit && task) {
        const payload: any = {
          title,
          description,
          priority,
          status,
          dueDate,
        };

        // ✅ ONLY send assignedToId if it exists in task
        if (task.assignedToId !== undefined) {
          payload.assignedToId = task.assignedToId?._id ?? null;
        }

        await updateTask({
          id: task._id,
          payload,
        });
      } else {
        await createTask({
          title,
          description,
          priority,
          dueDate: new Date(dueDate).toISOString(),
          assignedToId: null,
        });
      }

      onClose();
    } catch (err) {
      setError("Failed to save task");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-4 border">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as TaskPriority)
          }
          className="border rounded px-2 py-2"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="URGENT">URGENT</option>
        </select>

        {isEdit && (
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as TaskStatus)
            }
            className="border rounded px-2 py-2"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        )}
      </div>

      <input
        type="date"
        className="border rounded px-3 py-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update"
              : "Create"}
        </button>
      </div>
    </div>
  );
}
