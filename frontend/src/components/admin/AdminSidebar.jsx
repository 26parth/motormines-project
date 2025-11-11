// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingBag,
//   Users,
//   Settings,
// } from "lucide-react";

// const menuItems = [
//   { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
//   { name: "Products", path: "/admin/products", icon: Package },
//   { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
//   { name: "Users", path: "/admin/users", icon: Users },
//   { name: "Settings", path: "/admin/settings", icon: Settings },
// ];

// const AdminSidebar = () => {
//   return (
//     <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow-sm min-h-screen p-5 fixed">
//       {/* Sidebar Header */}
//       <div className="mb-8">
//         <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
//           ⚙️ Control Panel
//         </h2>
//         <p className="text-xs text-gray-500">Manage everything easily</p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex flex-col gap-1">
//         {menuItems.map(({ name, path, icon: Icon }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
//                 isActive
//                   ? "bg-blue-600 text-white shadow"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`
//             }
//           >
//             <Icon className="w-5 h-5" />
//             <span className="font-medium text-sm">{name}</span>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer info */}
//       <div className="mt-auto pt-6 border-t text-xs text-gray-500">
//         © {new Date().getFullYear()} MotorMines Admin
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;
