import React from "react";
import { Bell, User } from "lucide-react";

const AdminNavbar = () => {
  return (
    <div className="bg-white shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>

      <div className="flex items-center gap-5">
        <Bell className="text-gray-600 cursor-pointer hover:text-blue-600" />
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="text-gray-600" />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
