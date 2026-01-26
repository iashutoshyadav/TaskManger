import { Task } from "@/types/task";
import { Pencil, Trash2, Calendar, User, CheckCircle2 } from "lucide-react";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  canDelete?: boolean;
};

const PRIORITY_STYLES: Record<string, string> = {
  HIGH: "bg-rose-50 text-rose-600 border-rose-100",
  MEDIUM: "bg-amber-50 text-amber-600 border-amber-100",
  LOW: "bg-accent-light/10 text-accent-dark border-accent-light/20",
};

const STATUS_STYLES: Record<string, string> = {
  IN_PROGRESS: "bg-brand/10 text-brand border-brand/20",
  REVIEW: "bg-purple-50 text-purple-600 border-purple-100",
  COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

export default function TaskCard({ task, onEdit, onDelete, canDelete }: Props) {
  const assignedUser =
    typeof task.assignedToId === "object"
      ? task.assignedToId?.name
      : "Unassigned";

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : "No due date";

  return (
    <div className="glass-card group hover:scale-[1.02] transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg border ${PRIORITY_STYLES[task.priority] || "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
              {task.priority || 'NORMAL'}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg border ${STATUS_STYLES[task.status] || "bg-slate-50 text-slate-500 border-slate-100"
              }`}>
              {task.status?.replace('_', ' ')}
            </span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand transition-all"
              title="Edit Task"
            >
              <Pencil size={14} />
            </button>
            {canDelete && (
              <button
                onClick={() => onDelete(task._id)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
                title="Delete Task"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="mb-6 flex-1">
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-brand transition-colors mb-2">
            {task.title}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {task.description || "No specific details provided for this project task."}
          </p>
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wide">{dueDate}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <User size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wide truncate max-w-[80px]">
                {assignedUser}
              </span>
            </div>
          </div>

          {task.status === 'COMPLETED' ? (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 w-fit px-2 py-1 rounded-md">
              <CheckCircle2 size={12} />
              Finalized
            </div>
          ) : (
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full transition-all duration-700 ${task.status === 'IN_PROGRESS' ? 'bg-brand' : 'bg-slate-300'
                  }`}
                style={{ width: task.status === 'IN_PROGRESS' ? '65%' : '10%' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
