import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { Calendar, X } from "lucide-react";

type Props = {
  task?: Task;
  onClose: () => void;
};

export default function TaskForm({ task, onClose }: Props) {
  const isEdit = Boolean(task);

  const { createTask, updateTask, refetch } = useTasks({
    page: 1,
    limit: 20,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<Task["priority"]>("MEDIUM");
  const [status, setStatus] =
    useState<Task["status"]>("PENDING");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(
        task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        title,
        description,
        priority,
        status,
        dueDate: dueDate
          ? new Date(dueDate).toISOString()
          : null,
      };

      if (isEdit && task) {
        const id = task._id;
        if (!id) throw new Error("Invalid task ID");

        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }

      await refetch();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Failed to save task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/5 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 max-w-5xl w-full mx-auto my-auto animate-in zoom-in-95 duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-slate-900">
            {isEdit ? "Update Task" : "Create Task"}
          </h2>
          <button onClick={onClose} type="button" className="p-2 hover:bg-slate-50 rounded-lg group transition-colors">
            <X size={18} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl mb-6 text-rose-600 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Core Info */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Task Identification</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-brand/40 transition-colors font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contextual Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-brand/40 transition-colors resize-none min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>

            {/* Right Column: Metadata */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-600 text-sm font-bold focus:outline-none focus:border-brand/40 cursor-pointer hover:bg-slate-50 transition-colors appearance-none"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Task["status"])}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-600 text-sm font-bold focus:outline-none focus:border-brand/40 cursor-pointer hover:bg-slate-50 transition-colors appearance-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Target Deadline</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-4 pr-10 py-3 text-slate-600 text-sm font-bold focus:outline-none focus:border-brand/40 transition-colors appearance-none"
                  />
                  <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex justify-end items-center gap-6 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#8b5cf6] text-white px-10 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-brand/10 hover:bg-[#7c3aed] active:scale-95 disabled:opacity-50 transition-all min-w-[140px]"
                >
                  {loading ? "..." : isEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
