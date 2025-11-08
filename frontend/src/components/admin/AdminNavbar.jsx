import React, { useContext } from "react";
import { LogOut, Bell, Menu } from "lucide-react"; // lucide-react = modern icons
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Admin logged out!");
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-sm px-6 py-3 border-b sticky top-0 z-50">
      {/* Left Section - Logo & Toggle */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          🛠️ Admin Panel
        </h1>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=Admin"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "Admin"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
