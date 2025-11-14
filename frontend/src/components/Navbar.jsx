// ✅ Navbar.jsx (animated with Anime.js)
// NOTE: Only animation additions — NO logic changes.

import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package, LogOut, Edit, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

// Use Vite-friendly import for anime (works with animejs@3.2.1)
import anime from "animejs/lib/anime.es.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Refs for animation targets
  const navRef = useRef(null); // whole nav container for entrance
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const cartBadgeRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ✅ Auth & Cart context access (NO CHANGE)
  const { user, logout, setUser } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  // 🟣 Close profile dropdown when clicking outside (NO CHANGE)
  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔴 Logout handler (NO CHANGE)
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

  // ---------------------------
  // ENTRY ANIMATIONS (on mount)
  // ---------------------------
  useEffect(() => {
    // small staggered entrance for logo + links + icons
    const timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 600,
    });

    // nav fade in
    timeline.add({
      targets: navRef.current,
      opacity: [0, 1],
      translateY: [-8, 0],
    }, 0);

    // logo pop
    timeline.add({
      targets: logoRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
    }, "-=300");

    // links slide in (stagger)
    if (linksRef.current) {
      const linkChildren = Array.from(linksRef.current.querySelectorAll("a, button"));
      timeline.add({
        targets: linkChildren,
        translateY: [10, 0],
        opacity: [0, 1],
        delay: anime.stagger(60),
      }, "-=450");
    }

    // icons fade in
    timeline.add({
      targets: navRef.current.querySelectorAll(".nav-icon"),
      translateY: [6, 0],
      opacity: [0, 1],
      delay: anime.stagger(60),
    }, "-=500");

    // cleanup: remove any animation targets
    return () => {
      anime.remove(navRef.current);
      anime.remove(logoRef.current);
      if (linksRef.current) anime.remove(linksRef.current.querySelectorAll("a,button"));
    };
  }, []);

  // ---------------------------------------
  // PROFILE DROPDOWN open/close animation
  // ---------------------------------------
  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    if (profileOpen) {
      // show dropdown with grow + fade
      anime.remove(el);
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [0.95, 1],
        translateY: [-6, 0],
        duration: 220,
        easing: "easeOutQuad",
        begin: () => {
          el.style.pointerEvents = "auto";
        },
      });
    } else {
      // hide dropdown
      anime.remove(el);
      anime({
        targets: el,
        opacity: [1, 0],
        scale: [1, 0.95],
        translateY: [0, -6],
        duration: 180,
        easing: "easeInQuad",
        complete: () => {
          el.style.pointerEvents = "none";
        },
      });
    }

    return () => anime.remove(el);
  }, [profileOpen]);

  // ---------------------------------------
  // MOBILE MENU open/close slide animation
  // ---------------------------------------
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;

    if (menuOpen) {
      // slide in from top with fade
      anime.remove(el);
      anime({
        targets: el,
        translateY: [-12, 0],
        opacity: [0, 1],
        duration: 260,
        easing: "easeOutQuad",
        begin: () => (el.style.display = "block"),
      });
    } else {
      anime.remove(el);
      anime({
        targets: el,
        translateY: [0, -12],
        opacity: [1, 0],
        duration: 180,
        easing: "easeInQuad",
        complete: () => (el.style.display = "none"),
      });
    }

    return () => anime.remove(el);
  }, [menuOpen]);

  // ---------------------------------------
  // CART COUNT pulse when count changes
  // ---------------------------------------
  useEffect(() => {
    const badge = cartBadgeRef.current;
    if (!badge) return;

    // small pulse if count increases
    anime.remove(badge);
    anime({
      targets: badge,
      scale: [1, 1.25, 1],
      duration: 650,
      easing: "easeOutElastic(1, .8)",
    });

    return () => anime.remove(badge);
  }, [cartCount]);

  return (
    <nav ref={navRef} className="bg-gray-900 text-white shadow-md px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* 🔷 Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            ref={logoRef}
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
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
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
            <NavLink to="/cart" className="relative hover:text-blue-300 nav-icon">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold"
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {/* 📦 Orders */}
          {user && (
            <NavLink to="/orders" className="hover:text-blue-300 nav-icon">
              <Package size={20} />
            </NavLink>
          )}

          {/* 👤 Profile Dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-800 transition nav-icon"
              >
                <User size={20} />
                <span className="hidden sm:inline text-sm text-gray-200">
                  Hi, {user.fullname?.split(" ")[0] || "User"}
                </span>
              </button>

              {/* Dropdown menu */}
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 transform-origin-top-right ${profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                style={{ pointerEvents: profileOpen ? "auto" : "none" }}
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
      <div ref={mobileMenuRef} style={{ display: "none" }} className="md:hidden px-4 mt-3">
        {menuOpen && (
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
        )}
      </div>
    </nav>
  );
}
