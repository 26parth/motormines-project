import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 👈 for renderig pages ..
// import "../style/register.css";

const Register = () => {

  const navigate = useNavigate(); // 👈 initialize navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: data.fullname, // ✅ fixed (was data.name earlier)
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Registration failed!");
      } else {
        alert("🎉 " + result.message);

        // ✅ Redirect after 1.5 seconds (for better UX)
        setTimeout(() => {
          navigate("/login"); // 👈 redirect to login page ke liye use kar rahe hai !!
        }, 500);
        reset();
      }
    } catch (error) {
      console.error(error);
      alert("Server not responding 😕");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Background Animation */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-circle bg-blue-300/20 top-10 left-10"
      ></motion.div>
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-circle bg-blue-500/20 bottom-10 right-10"
      ></motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="register-card"
      >
        <h2 className="form-title">Create Account 🚀</h2>
        <p className="text-gray-600 text-center mb-6">
          Join <span className="font-semibold text-blue-500">MotorMines</span> today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullname", { required: "Full name is required" })} // ✅ fixed key
              className="form-input"
            />
            {errors.fullname && <p className="error-text">{errors.fullname.message}</p>} {/* ✅ fixed error name */}
          </div>

          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="form-input"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="form-input"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              className="form-input"
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Button */}
          <motion.button
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            disabled={loading}
            type="submit"
            className={`submit-btn ${loading ? "disabled" : ""}`}
          >
            {loading ? "Creating Account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
