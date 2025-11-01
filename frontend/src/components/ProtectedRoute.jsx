import React from "react";
import { Navigate } from "react-router-dom";


// protected routes hai user login ke bina access nahi karne denge !
export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
