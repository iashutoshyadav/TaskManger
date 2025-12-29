import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute() {
  const location = useLocation();
  console.log("🚀 ProtectedRoute mounted at:", location.pathname);

  const { user, loading } = useAuth({ enabled: true });
  console.log("🔐 Auth state in ProtectedRoute:", { user, loading });

  if (loading) {
    console.log("⏳ Auth is still loading...");
    return <div>Loading auth...</div>;
  }

  if (!user) {
    console.error("❌ No user found → redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ User exists → rendering dashboard");
  return <Outlet />;
}
