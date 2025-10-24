import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    return <Navigate to="/staff/login" />;
  }
  return children;
};

export default ProtectedRoute;
