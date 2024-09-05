import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./components/login/AuthContext";
const PrivateRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" />;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    // Si el usuario no tiene el rol adecuado, redirige a la página de inicio
    return <Navigate to="/" />;
  }

  // Si está autenticado y tiene los permisos, renderiza el contenido protegido
  return <Outlet />;
};

export default PrivateRoute;
