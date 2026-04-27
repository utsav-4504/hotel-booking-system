import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../component/Loader";

function ProtectedRoute() {
  const { isAuthenticated, authReady } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
