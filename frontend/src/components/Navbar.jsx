// ✅ Navbar.jsx
// Ye file top navigation handle karti hai + cart count badge show karti hai (Flipkart-style)

import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package, LogOut, Edit, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Auth & Cart context access
  const { user, logout, setUser } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  // 🟣 Close profile dropdown when clicking outside
  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔴 Logout handler
  const handleLogout = async () => {
    console.log("Logout button clicked ✅");
    try {
      await logout();
      setProfileOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed ❌", err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* 🔷 Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/images/Residential Pumps.jpg"
            alt="MotorMines Logo"
            className="w-10 h-10 rounded"
            draggable="false"
          />
          <NavLink to="/" className="text-2xl font-bold text-blue-400">
            MotorMines
          </NavLink>
        </div>

        {/* 🔷 Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Contact"].map((page) => (
            <NavLink
              key={page}
              to={`/${page === "Home" ? "" : page.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "text-blue-300 font-semibold" : "text-gray-200 hover:text-blue-300"
              }
            >
              {page}
            </NavLink>
          ))}

          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-300 font-semibold" : "text-gray-200 hover:text-blue-300"
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* 🔷 Right: Icons */}
        <div className="flex items-center gap-4">
          {/* 🛒 Cart icon with animated count badge */}
          {user && (
            <NavLink to="/cart" className="relative hover:text-blue-300">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-bounce">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {/* 📦 Orders */}
          {user && (
            <NavLink to="/orders" className="hover:text-blue-300">
              <Package size={20} />
            </NavLink>
          )}

          {/* 👤 Profile Dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 transition"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm text-gray-200">
                  Hi, {user.fullname?.split(" ")[0] || "User"}
                </span>
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 ${
                  profileOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <NavLink
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <Edit size={14} /> Edit Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}

          {/* 📱 Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen((m) => !m)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Links */}
      {menuOpen && (
        <div className="md:hidden px-4 mt-3">
          <div className="bg-gray-800 rounded-lg p-3 space-y-2">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">Home</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">Contact</NavLink>
            {!user && (
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">Login</NavLink>
            )}
            {user && (
              <>
                <div className="border-t border-gray-700 pt-2">
                  <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">Cart</NavLink>
                  <NavLink to="/orders" onClick={() => setMenuOpen(false)} className="block text-gray-200 hover:text-blue-300">Orders</NavLink>
                </div>
                <button
                  onClick={handleLogout}
                  className="block text-gray-200 hover:text-red-400 w-full text-left pt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
