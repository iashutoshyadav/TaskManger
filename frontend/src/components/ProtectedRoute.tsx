import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth({ enabled: true });

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
