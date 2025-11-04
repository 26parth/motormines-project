import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package, LogOut, Edit, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // 👈 add this line


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
const { cartCount } = useContext(CartContext);

    // 👇 Ye line add karo — ye context se user state lega
const { user, setUser, logout } = useContext(AuthContext);

  // const { cartCount } = useContext(CartContext);
  // const [user, setUser] = useState(null); // 👈 store logged-in user
  const profileRef = useRef(null);
  const navigate = useNavigate();


  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

const handleLogout = async () => {
  console.log("Logout button clicked ✅");
  try {
    await logout();
    console.log("Logout API called ✅");
    setProfileOpen(false);
    navigate("/login");
  } catch (err) {
    console.error("Logout failed ❌", err);
  }
};

  return (
    <nav className="bg-gray-900 text-white shadow-md px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="/images/Residential Pumps.jpg"
            alt="MotorMines Logo"
            className="w-15 h-15 rounded"
            draggable="false"
          />
          <NavLink to="/" className="text-2xl font-bold text-blue-400">
            MotorMines
          </NavLink>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold" : "text-gray-200 hover:text-blue-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold" : "text-gray-200 hover:text-blue-300"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold" : "text-gray-200 hover:text-blue-300"
            }
          >
            Contact
          </NavLink>

          {/* 👇 Show Login only when no user */}
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

        {/* Right: Cart, Orders, Profile */}
<div className="flex items-center gap-4">
  {/* 👇 Cart only for logged-in users */}
{user && (
  <NavLink to="/cart" className="relative hover:text-blue-300">
    <ShoppingCart size={20} />
    <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  </NavLink>
)}


  {/* 👇 Orders only for logged-in users */}
  {user && (
    <NavLink to="/orders" className="hover:text-blue-300">
      <Package size={20} />
    </NavLink>
  )}

  {/* 👇 Profile dropdown (only when logged in) */}
  {user && (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setProfileOpen(p => !p)}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 transition"
        aria-expanded={profileOpen}
      >
        <User size={20} />
        <span className="hidden sm:inline text-sm text-gray-200">
          Hi, {user.fullname?.split(" ")[0] || "User"}
        </span>
      </button>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transition-transform transform ${
          profileOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ transitionDuration: "160ms" }}
      >
        <NavLink
          to="/profile"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
          onClick={() => setProfileOpen(false)}
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

  {/* Mobile menu button */}
  <button className="md:hidden p-2" onClick={() => setMenuOpen(m => !m)}>
    {menuOpen ? <X size={22} /> : <Menu size={22} />}
  </button>
</div>

      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden px-4 mt-3 ${menuOpen ? "block" : "hidden"}`}>
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
    </nav>
  );
}
