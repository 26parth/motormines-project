import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // ✅ Prevent logged-in user from seeing Login page again
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // ✅ For input handling
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Main submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.success) {
        // ✅ Save to Context + localStorage
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/"); // ✅ Redirect after successful login
      } else {
        setMessage(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Server error while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-hidden">
      {/* Background bubbles */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-80 h-80 bg-blue-300/20 rounded-full blur-3xl -top-20 -left-20"
      ></motion.div>
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-0"
      ></motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 w-full max-w-md border border-white/30"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login to your{" "}
          <span className="font-semibold text-blue-500">MotorMines</span> account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm mt-1">
            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        <p className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
