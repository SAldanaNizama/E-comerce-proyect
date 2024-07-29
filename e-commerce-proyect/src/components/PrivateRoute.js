import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./login/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
