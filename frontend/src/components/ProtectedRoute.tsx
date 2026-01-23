import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import FullPageLoader from "./FullPageLoader";

export default function ProtectedRoute() {
  const location = useLocation();
  console.log("🚀 ProtectedRoute mounted at:", location.pathname);

  const { user, loading } = useAuth({ enabled: true });
  console.log("🔐 Auth state in ProtectedRoute:", { user, loading });

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
