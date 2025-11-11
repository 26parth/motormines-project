// frontend/src/components/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminInfo = localStorage.getItem("adminInfo");

  if (!adminInfo) {
    // Agar admin login info nahi hai
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
