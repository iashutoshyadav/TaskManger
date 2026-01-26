import { useNavigate, useSearchParams } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import ProjectForm from "@/components/ProjectForm";
import Loader from "@/components/Loader";
import { Briefcase, Users, FileText, Calendar, Search, Filter, Trash2, Edit2 } from "lucide-react";
import { Project, ProjectStatus } from "@/types/project";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Projects() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const showForm = searchParams.get("new") === "true";
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const { projects, isLoading, createProject, updateProject, deleteProject } = useProjects();
    const { user } = useAuth({ enabled: false });

    const handleCreate = async (data: any) => {
        try {
            if (editingProject) {
                await updateProject(editingProject._id, data);
                setEditingProject(null);
            } else {
                await createProject(data);
                setSearchParams({});
            }
        } catch (error) {
            console.error("Failed to save project", error);
        }
    };

    const onClose = () => {
        setSearchParams({});
        setEditingProject(null);
    };

    const getStatusColor = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.ACTIVE: return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
            case ProjectStatus.PLANNING: return "bg-blue-100 text-blue-700 ring-blue-600/20";
            case ProjectStatus.ON_HOLD: return "bg-amber-100 text-amber-700 ring-amber-600/20";
            default: return "bg-slate-100 text-slate-700 ring-slate-600/20";
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="h-2"></div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand" size={18} />
                    <input
                        placeholder="Search operational projects..."
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:border-brand focus:ring-4 focus:ring-brand/5 outline-none transition-all shadow-sm"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {isLoading ? (
                <Loader variant="card" count={6} />
            ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 glass-card border-dashed border-2">
                    <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Briefcase size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No projects established</h3>
                    <p className="text-slate-500 mt-1 max-w-sm text-center">Your portfolio is currently empty. Start by establishing your first strategic project brief.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project: Project) => (
                        <div key={project._id} className="glass-card group hover:border-brand/30 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:bg-brand/5 group-hover:text-brand transition-colors">
                                            <Briefcase size={18} />
                                        </div>
                                        {(user?.role === "ADMIN" || project.creatorId === user?.id) && (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditingProject(project)}
                                                    className="p-2 rounded-xl text-slate-300 hover:bg-brand/5 hover:text-brand transition-all font-bold"
                                                    title="Edit Project"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm("Permanently remove this project and all associated data?")) {
                                                            deleteProject(project._id);
                                                        }
                                                    }}
                                                    className="p-2 rounded-xl text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
                                                    title="Delete Project"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand transition-colors line-clamp-1">{project.title}</h3>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px] font-medium leading-relaxed">{project.description}</p>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Users size={16} className="text-slate-400" />
                                        <span className="text-xs font-bold">Require: {project.teamSize} Headcount</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span className="text-xs font-bold">Commence: {new Date(project.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-start gap-3 mt-4 p-3 bg-slate-50 rounded-xl">
                                        <FileText size={16} className="text-slate-400 mt-1" />
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                                            <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Requirements</span>
                                            {project.requirements}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/dashboard/tasks?projectId=${project._id}`)}
                                className="w-full mt-6 py-3 border border-slate-100 rounded-xl text-xs font-bold text-brand hover:bg-brand hover:text-white transition-all uppercase tracking-widest"
                            >
                                View Portfolio Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {(showForm || editingProject) && (
                <ProjectForm
                    project={editingProject ?? undefined}
                    onClose={onClose}
                    onSubmit={handleCreate}
                    loading={isLoading}
                />
            )}
        </div>
    );
}
