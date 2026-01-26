import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import JoinWorkspaceModal from "@/components/JoinWorkspaceModal";

const Register = () => {
  const { register, user } = useAuth({ enabled: false });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register({
        name,
        email,
        password,
        organizationName: organizationName || undefined,
        inviteToken: inviteToken || undefined
      });
      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user && inviteToken) {
    return (
      <JoinWorkspaceModal
        token={inviteToken}
        onClose={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <div className="w-full p-6 animate-in fade-in duration-700">
      <div className="w-full max-w-md mx-auto">
        <div className="glass-card border-none shadow-2xl shadow-gray-200/60 p-10">
          <div className="text-center mb-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2">
              Join Toko.io
              <Sparkles className="text-brand" size={24} />
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest p-4 rounded-xl border border-rose-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
                <input
                  placeholder="Professional Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">Corporate Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">Security Access</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {!inviteToken && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600 ml-1">Workspace / Company Name (Optional)</label>
                <div className="relative group">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                  <input
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-medium outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 transition-all"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-14 text-base flex items-center justify-center gap-2 group shadow-xl shadow-brand/20"
            >
              {loading ? "Initializing..." : (
                <>
                  Start
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-2 border-t border-gray-500 text-center">
            <p className="text-[10px] font-medium text-gray-600">
              By registering, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </div>
          <p className="text-sm text-center mt-5 text-slate-600 font-medium">
            Already an Toko?{" "}
            <Link to="/login" className="text-brand font-bold hover:underline">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
