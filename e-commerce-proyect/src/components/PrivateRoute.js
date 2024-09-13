import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./login/AuthContext";

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirige a la página de inicio de sesión
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirige a la página de inicio
  if (requiredRole && !user.roles.some((role) => role.name === requiredRole)) {
    return <Navigate to="/" />;
  }

  // Si el usuario está autenticado y tiene el rol adecuado (si es requerido), muestra la página
  return <Outlet />;
};

export default PrivateRoute;
