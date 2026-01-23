import { useState, useEffect } from "react";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import {
  ArrowRight,
  BarChart3,
  Users,
  MessageCircle,
  Target,
  Sparkles,
  Lock,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, texts, currentTextIndex]);

  return (
    <span className="text-brand inline-block min-w-[200px]">
      {currentText}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-brand/10 selection:text-brand overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="w-full pl-6 md:pl-12 pr-0 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">toko.io</span>
          </div>

          <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
            <a href="#features" className="text-sm font-bold text-slate-500 hover:text-brand transition-colors">Platform</a>
            <a href="#solutions" className="text-sm font-bold text-slate-500 hover:text-brand transition-colors">Solutions</a>
          </div>

          <div className="flex items-center gap-4">
            {/* <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-brand transition-colors">
              Sign In
            </Link> */}

            <button
              onClick={() => setShowLogin(true)}
              className="text-sm font-bold text-slate-600 hover:text-brand"
            >
              Sign In
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-brand/90 transition-all shadow-xl shadow-brand/10 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative pt-24 pb-12 z-10">
        <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-[1.1] text-slate-900 tracking-tight">
              Systematize your vision <br />
              <Typewriter texts={["easily", "without confusion", "faster", "together"]} />
            </h1>

            <p className="text-lg text-slate-500 font-medium max-w-xl mb-6 leading-relaxed">
              The only workspace designed for teams who need clarity, speed, and real-time project intelligence. Execute strategy, not just tasks.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setShowRegister(true)}
                className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:bg-brand/90 flex items-center justify-center gap-3 transition-all shadow-2xl shadow-brand/20 hover:-translate-y-1"
              >
                Initiate Workspace
                <ArrowRight size={18} />
              </button>

              <a
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-black uppercase tracking-[0.15em] text-xs hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Watch Strategy Session
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 border-4 border-white rounded-full bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Trusted by 500+ <span className="text-slate-800">Scaling Teams</span>
              </p>
            </div>
          </div>

          {/* Task Showcase Mock UI */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 [animation-delay:200ms]">
            <div className="absolute inset-0 bg-brand/5 rounded-[40px] blur-3xl -z-10" />
            <div className="glass-card p-6 border-slate-200 shadow-2xl shadow-slate-200/50 transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase">Q1 Strategic Growth</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Expansion Track</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">On Track</div>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Market Analysis - SE Asia", status: "Done", icon: <CheckCircle2 className="text-emerald-500" /> },
                  { title: "Localization Pipeline", status: "Processing", icon: <Clock className="text-amber-500 animate-spin-slow" /> },
                  { title: "Hiring Lead Architects", status: "Open", icon: <Users className="text-indigo-500" /> },
                ].map((task, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-brand/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {task.icon}
                      <span className="text-sm font-bold text-slate-700">{task.title}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Details</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Milestone Velocity</span>
                  <span className="text-sm font-black text-brand">74%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[74%] bg-brand rounded-full" />
                </div>
              </div>
            </div>

            {/* Floaties */}
            <div className="absolute -top-6 -right-6 lg:-right-12 glass-card p-4 animate-bounce duration-[3s] hidden md:block">
              <div className="flex items-center gap-3">
                <Zap size={16} className="text-amber-500" />
                <span className="text-[10px] font-black uppercase text-slate-700">Priority Peak Reached</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PLATFORM FEATURES */}
      <section id="features" className="py-12 bg-white relative overflow-hidden">
        <div className="px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-3 text-slate-900 tracking-tight">
              Engineered for Precision.
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase text-xs tracking-[0.3em]">
              The architecture of focused execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={32} />,
                title: "Strategic Clarity",
                desc: "Every task is tied to a higher-level objective. Never lose sight of the 'Why'.",
                color: "text-brand",
                bg: "bg-brand/5"
              },
              {
                icon: <BarChart3 size={32} />,
                title: "Velocity Insights",
                desc: "Real-time charts show you exactly where projects are stalled before they fail.",
                color: "text-indigo-600",
                bg: "bg-indigo-50"
              },
              {
                icon: <MessageCircle size={32} />,
                title: "Contextual Chat",
                desc: "Discussions happen directly within tasks. No more digging through Slack for decisions.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-10 bg-white rounded-[32px] border border-slate-100 hover:border-brand/20 transition-all hover:shadow-2xl hover:shadow-brand/5"
              >
                <div className={`mb-8 p-4 rounded-2xl inline-block ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section id="solutions" className="py-12 bg-slate-50/50">
        <div className="px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-10 flex gap-6 items-start">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Enterprise-Grade Security</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  End-to-end encryption for all strategic documents. ISO 27001 compliant architecture ensuring your intellectual property remains yours.
                </p>
              </div>
            </div>
            <div className="glass-card p-10 flex gap-6 items-start">
              <div className="p-4 bg-brand/5 text-brand rounded-2xl">
                <Lock size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Access Orchestration</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Granular role-based access controls. Control exactly who sees which roadmap, down to individual task sensitivity levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 md:px-12">
        <div className="bg-brand rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative background for CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Ready to build?
          </h2>
          <p className="text-gray-200 font-medium text-lg mb-12 max-w-2xl mx-auto opacity-80">
            Join the teams building the future with clarity. Start your strategic mission today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowRegister(true)}
              className="bg-white text-brand px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all flex items-center gap-3"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-gray-200">
        <div className="px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">T</span>
              </div>
              <span className="text-sm font-black">toko.io</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8 text-xs font-bold text-slate-700">
              <div className="flex gap-4">
                <a href="#" className="hover:text-brand">Twitter</a>
                <a href="#" className="hover:text-brand">LinkedIn</a>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-brand">Privacy</a>
                <a href="#" className="hover:text-brand">Terms</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
              © 2026 Toko Intelligent Systems
            </div>

          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* REGISTER MODAL */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

    </div>
  );
}
