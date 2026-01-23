import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { User, Mail, Shield, Calendar, Activity, Settings2, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth({ enabled: true });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Loader count={1} className="h-[400px]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
          <Shield size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Session Expired</h2>
        <p className="text-slate-500 mt-2">Please log in again to access your profile.</p>
        <button className="btn-primary mt-6">Go to Login</button>
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "U";

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "—";

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="mt-4">
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-rose-600 font-bold text-sm bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar / Overview */}
        <div className="space-y-6">
          <div className="glass-card flex flex-col items-center py-10 text-center">
            <div className="h-24 w-24 rounded-full bg-brand flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-brand/20 border-4 border-white ring-1 ring-slate-100 mb-6">
              {initials}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">{user.email}</p>

            <div className="mt-8 pt-8 border-t border-slate-100 w-full flex justify-around">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">12</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-brand">94%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Score</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-brand/5 text-brand rounded-xl font-bold text-sm transition-all">
                <User size={18} />
                Basic Info
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                <Shield size={18} />
                Security
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
                <Settings2 size={18} />
                Preferences
              </button>
            </nav>
          </div>
        </div>

        {/* Form / Details */}
        <div className="md:col-span-2 space-y-8">
          <div className="glass-card">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-brand" />
              Personal Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700">
                    {user.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account Type</label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-brand">
                    Standard Professional
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700">
                  <Mail size={16} className="text-slate-400" />
                  {user.email}
                  <span className="ml-auto text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Verified</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
              <button className="btn-primary">Update Profile</button>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield size={20} className="text-brand" />
              Account Activity
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="h-10 w-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Joined Platform</p>
                  <p className="text-sm font-bold text-slate-700">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="h-10 w-10 bg-accent-light/10 text-accent-dark rounded-xl flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Session</p>
                  <p className="text-sm font-bold text-slate-700">{formatDate(user.lastLoginAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
