import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Star } from "lucide-react"; // 👈 Star icon for Features

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Features", path: "/admin/features", icon: <Star size={20} /> }, // ✅ New Feature Link
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">⚙️ Motormines</h2>

      <nav className="flex-1 space-y-2">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-2 mt-10 bg-red-600 hover:bg-red-700 rounded-md transition">
        <LogOut size={20} />
        AdminLogout
      </button>
    </div>
  );
};

export default AdminSidebar;
