import { useAuth } from "./context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./components/Loading";

function ProtectedRoute() {
  const { isLoading, isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  if (isLoading) return <Loading />;

  return <Outlet />;
}

export default ProtectedRoute;
