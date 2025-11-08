// frontend/src/layouts/AdminLayout.jsx
import React from "react";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import AdminNavbar from "../pages/Admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
