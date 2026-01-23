import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";

const Login = () => {
  const { login } = useAuth({ enabled: false });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 0);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-700 bg-white rounded-3xl">
      <div className="w-full max-w-md mx-auto">

        {/* CARD */}
        <div className="glass-card border-none shadow-2xl shadow-slate-200/60 px-10 py-6">

          {/* LOGO — CENTERED */}
          <div className="flex justify-center mb-5">
            <div className="h-12 w-12 rounded-2xl bg-brand flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-brand/20">
              T
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest p-4 rounded-xl border border-rose-100 text-center">
                {error}
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Corporate Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Security Access
                </label>
                <a
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-widest text-brand hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-14 text-base flex items-center justify-center gap-2 shadow-xl shadow-brand/20"
            >
              {loading ? "Authenticating..." : (
                <>
                  Enter Workspace
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
              Or continue with
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Github size={18} />
                Github
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                <span className="text-blue-600 font-bold">G</span>
                Google
              </button>
            </div>
          </div>

          {/* BOTTOM TEXT — CENTERED */}
          <p className="text-sm text-center mt-5 text-slate-500 font-medium">
            New to Toko.io?{" "}
            <Link to="/register" className="text-brand font-bold hover:underline">
              Initiate Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

};

export default Login;
