import { useState, useEffect } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import { verifyInvitation, acceptInvitation } from "@/api/invitation.api";

type Props = {
    token: string;
    onClose: () => void;
};

export default function JoinWorkspaceModal({ token, onClose }: Props) {
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const checkInvite = async () => {
            try {
                await verifyInvitation(token);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Invalid invitation");
            } finally {
                setLoading(false);
            }
        };
        checkInvite();
    }, [token]);

    const handleAccept = async () => {
        setAccepting(true);
        setError("");
        try {
            await acceptInvitation(token);
            setSuccess(true);
            setTimeout(() => {
                onClose();
                // Redirect to dashboard to refresh state
                window.location.href = "/dashboard";
            }, 2000);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to join workspace");
            setAccepting(false);
        }
    };

    if (loading) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-white rounded-[32px] p-10 shadow-3xl border border-slate-100 max-w-lg w-full animate-in zoom-in-95 duration-500 text-center">
                {!success ? (
                    <>
                        <div className="h-16 w-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Sparkles size={32} />
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 mb-2">Join Workspace?</h2>
                        <p className="text-slate-500 mb-8 font-medium">
                            You've been invited to join a new organization. Accepting this invitation will switch your account to this workspace.
                        </p>

                        {error && <p className="text-xs text-rose-500 font-bold uppercase mb-6 bg-rose-50 p-3 rounded-xl border border-rose-100">{error}</p>}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleAccept}
                                disabled={accepting}
                                className="w-full bg-brand text-white h-14 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all disabled:opacity-50"
                            >
                                {accepting ? "Joining..." : "Accept Invitation"}
                            </button>

                            <button
                                onClick={onClose}
                                className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors mt-2"
                            >
                                No thanks, keep current
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="py-6">
                        <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} strokeWidth={3} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Aboard!</h2>
                        <p className="text-slate-500 font-medium">
                            You are now a member of the new workspace. Switching you over...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
