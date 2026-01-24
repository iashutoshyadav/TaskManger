import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import FullPageLoader from "./FullPageLoader";

export default function ProtectedRoute() {
  const location = useLocation();
  const { user, loading } = useAuth({ enabled: true });
  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
