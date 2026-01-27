import { useState } from "react";
import { X, Send, Copy, Check } from "lucide-react";
import { createInvitation } from "@/api/invitation.api";

type Props = {
    onClose: () => void;
};

export default function InviteModal({ onClose }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { invitation } = await createInvitation(email);
            const link = `${window.location.origin}/register?invite=${invitation.token}`;
            setInviteLink(link);
            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to send invitation");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[24px] p-8 shadow-2xl border border-slate-100 max-w-md w-full animate-in zoom-in-95 duration-500">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Invite Member</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg group transition-colors">
                        <X size={20} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                    </button>
                </div>

                {!success ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-sm text-slate-500 font-medium">
                            Invite your friends or colleagues to your workspace. They will join your organization automatically.
                        </p>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Friend's Email</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-brand transition-colors font-medium"
                            />
                        </div>

                        {error && <p className="text-xs text-rose-500 font-bold uppercase">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand text-white h-14 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-brand/20 hover:bg-brand/90 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? "Sending..." : (
                                <>
                                    Generate Invite Link
                                    <Send size={16} />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6 text-center py-4">
                        <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check size={32} strokeWidth={3} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Invite Link Generated!</h3>
                        <p className="text-sm text-slate-500 font-medium">
                            Copy the link below and send it to <b>{email}</b>.
                        </p>

                        <div className="relative group mt-4">
                            <input
                                readOnly
                                value={inviteLink}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-4 text-xs font-mono text-slate-600 outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                            >
                                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-slate-400" />}
                            </button>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-6 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
