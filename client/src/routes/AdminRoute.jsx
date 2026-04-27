import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../component/Loader";

function AdminRoute() {
  const { authReady, isAuthenticated, isAdmin } = useAuth();

  if (!authReady) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
