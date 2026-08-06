import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function RoleRoute({
  children,

  role,
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;
