import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";
import { ChevronRight, Clock } from "lucide-react";

export default function Calendar() {
  const { tasks, isLoading, error } = useTasks({
    page: 1,
    limit: 50,
    filters: {}
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400 font-medium">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
          Synchronizing events...
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="glass-card flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
      <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 font-bold">!</div>
      <h2 className="text-xl font-bold text-slate-800">Connection Failed</h2>
      <p className="text-slate-500 mt-2">We couldn't retrieve your schedule. Please refresh.</p>
    </div>
  );


  const events = (tasks as Task[])
    .filter((task) => task.dueDate)
    .map((task) => ({
      id: task._id,
      title: task.title,
      date: task.dueDate!,
      backgroundColor: '#0F3D2E',
      borderColor: '#0F3D2E',
    }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="h-4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 border-none shadow-xl shadow-slate-200/50">
          <style>{`
            .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
            .fc .fc-button-primary { background-color: white; border-color: #e2e8f0; color: #64748b; font-weight: bold; border-radius: 0.75rem; text-transform: capitalize; padding: 0.5rem 1rem; }
            .fc .fc-button-primary:hover { background-color: #f8fafc; color: #0F3D2E; }
            .fc .fc-button-primary:not(:disabled).fc-button-active { background-color: #0F3D2E; border-color: #0F3D2E; color: white; }
            .fc .fc-daygrid-day-number { font-weight: 700; color: #64748b; padding: 8px; }
            .fc .fc-col-header-cell-cushion { font-weight: 800; text-transform: uppercase; font-size: 0.75rem; color: #94a3b8; letter-spacing: 0.05em; padding: 12px; }
            .fc-theme-standard td, .fc-theme-standard th { border-color: #f1f5f9; }
          `}</style>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
          />
        </div>

        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
              Upcoming High-Priority
              <span className="text-[10px] bg-brand/10 text-brand px-2 py-1 rounded-full uppercase font-bold tracking-tighter">Crucial</span>
            </h2>

            {tasks.filter((t) => t.dueDate).length === 0 ? (
              <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-slate-400 font-medium text-sm">No critical deadlines</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks
                  .filter((t) => t.dueDate)
                  .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
                  .slice(0, 5)
                  .map((task) => (
                    <div key={task._id} className="group p-4 bg-white border border-slate-100 rounded-2xl hover:border-brand/40 transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                          <Clock size={18} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-brand transition-colors">{task.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest mt-1">
                            {new Date(task.dueDate!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-brand transition-all group-hover:translate-x-1" />
                    </div>
                  ))}
              </div>
            )}

            <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              View Full Agenda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
