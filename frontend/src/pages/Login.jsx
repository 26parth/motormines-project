import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import userApi from "../api/userApi";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, fetchProfile } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await userApi.post("/login", formData);

      if (res.data.success) {
        await fetchProfile();
        navigate("/");
      } else {
        setMessage(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Server error while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden p-4">

      {/* Background Animation Circles */}
      <motion.div
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.35 }}
        transition={{ duration: 1.2 }}
        className="absolute w-72 h-72 bg-blue-400/30 blur-3xl rounded-full top-0 left-0"
      />

      <motion.div
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.35 }}
        transition={{ duration: 1.4 }}
        className="absolute w-72 h-72 bg-purple-500/30 blur-3xl rounded-full bottom-0 right-0"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 sm:p-10 border border-white/40"
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
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="!mb-4"
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="!mb-4"
          />

          <div className="flex justify-end text-sm mt-1">
            <Link to="/forgotpassword" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              variant="contained"
              className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </motion.div>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-red-500">
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
