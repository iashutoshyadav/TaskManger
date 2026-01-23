// Restoration in progress
import { useState } from "react";
import { ProjectStatus, CreateProjectPayload } from "@/types/project";
import { X, Loader2, Calendar } from "lucide-react";

interface ProjectFormProps {
    onClose: () => void;
    onSubmit: (data: CreateProjectPayload) => Promise<void>;
    loading?: boolean;
}

export default function ProjectForm({ onClose, onSubmit, loading }: ProjectFormProps) {
    const [formData, setFormData] = useState<CreateProjectPayload>({
        title: "",
        description: "",
        requirements: "",
        teamSize: 1,
        status: ProjectStatus.PLANNING,
        startDate: new Date().toISOString().split('T')[0],
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            // Convert dates to ISO format for backend validation
            const payload: CreateProjectPayload = {
                ...formData,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
            };
            await onSubmit(payload);
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Execution failed. Please verify inputs.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/5 animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-white w-full max-w-5xl rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 p-8 my-auto animate-in zoom-in-95 duration-500">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Project Initiation</h2>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Define core vision and requirements</p>
                    </div>
                    <button onClick={onClose} type="button" className="p-2 hover:bg-slate-50 rounded-lg group transition-colors">
                        <X size={18} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold animate-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Project Title</label>
                                <input
                                    required
                                    autoFocus
                                    className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-brand/40 transition-colors font-medium text-sm"
                                    placeholder="e.g., Vision 2026 Milestone"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Project Vision</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-brand/40 transition-colors resize-none font-medium text-sm min-h-[140px]"
                                    placeholder="High-level overview and objectives..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Team Size</label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:border-brand/40 transition-colors font-medium text-sm"
                                        value={formData.teamSize}
                                        onChange={e => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 1 })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Kickoff</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg pl-4 pr-10 py-3 text-slate-600 focus:outline-none focus:border-brand/40 transition-colors font-medium appearance-none text-sm"
                                            value={formData.startDate}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                        <Calendar size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Operational Needs</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-[#fcfcfc] border border-slate-200 rounded-lg px-4 py-3 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-brand/40 transition-colors resize-none font-medium text-sm min-h-[140px]"
                                    placeholder="Skills, seniority, and critical roles..."
                                    value={formData.requirements}
                                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end items-center gap-6 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#8b5cf6] text-white px-10 py-3 rounded-xl font-black uppercase tracking-[0.15em] text-[10px] shadow-lg shadow-brand/10 hover:bg-[#7c3aed] active:scale-95 disabled:opacity-50 transition-all min-w-[180px] flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : "Initiate Project"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
