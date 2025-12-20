import { Task } from "@/types/task";
import { useEffect, useState } from "react";
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
  const [priority, setPriority] = useState("LOW");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  // Prefill for edit
  useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setPriority(task.priority ?? "LOW");
      setStatus(task.status ?? "TODO");
      setDueDate(task.dueDate?.slice(0, 10) ?? "");
    }
  }, [task]);

  const handleSubmit = async () => {
    try {
      if (isEdit && task) {
        // ✅ UPDATE
        await updateTask({
          id: task._id,
          payload: {
            title,
            description,
            priority,
            status,
            dueDate,
          },
        });
      } else {
        // ✅ CREATE
        await createTask({
          title,
          description,
          priority,
          status,
          dueDate,
        });
      }

      onClose(); // close only after success
    } catch (err) {
      console.error("Task submit failed", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>

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
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded px-2 py-2"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-2"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
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
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
