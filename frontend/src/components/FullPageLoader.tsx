import { Rocket } from "lucide-react";

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-md">
            <div className="relative">
                {/* Animated Rings */}
                <div className="absolute inset-0 animate-ping rounded-full bg-brand/10" />
                <div className="absolute -inset-4 animate-pulse rounded-full border border-brand/20" />

                {/* Logo Container */}
                <div className="relative h-20 w-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-brand/10 border border-slate-100">
                    <Rocket className="h-10 w-10 text-brand animate-bounce" />
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Coordinating Interface</h2>
                <div className="flex items-center gap-1.5">
                    <div className="h-1 w-1 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1 w-1 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1 w-1 bg-brand rounded-full animate-bounce" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Initializing Strategic Assets</p>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-brand/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse [animation-delay:1s]" />
        </div>
    );
}
