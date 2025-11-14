import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Registration failed!");
      } else {
        alert("🎉 " + result.message);
        setTimeout(() => navigate("/login"), 500);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 relative overflow-hidden">
      {/* Background Circles */}
      <motion.div
        initial={{ x: -200, y: -200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
        className="absolute w-72 h-72 rounded-full bg-blue-400/30 blur-3xl top-0 left-0"
      />
      <motion.div
        initial={{ x: 200, y: 200, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute w-72 h-72 rounded-full bg-purple-400/30 blur-3xl bottom-0 right-0"
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Create Account 🚀
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join <span className="font-semibold text-blue-500">MotorMines</span> today
        </p>

       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  {/* Full Name */}
  <TextField
    label="Full Name"
    placeholder="John Doe"
    fullWidth
    variant="outlined"
    {...register("fullname", { required: "Full name is required" })}
    error={!!errors.fullname}
    helperText={errors.fullname?.message}
    className="rounded-lg !mb-4"
  />

  {/* Email */}
  <TextField
    label="Email"
    placeholder="you@example.com"
    fullWidth
    variant="outlined"
    type="email"
    {...register("email", {
      required: "Email is required",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
    })}
    error={!!errors.email}
    helperText={errors.email?.message}
    className="rounded-lg !mb-4"
  />

  {/* Password */}
  <TextField
    label="Password"
    placeholder="••••••••"
    fullWidth
    variant="outlined"
    type="password"
    {...register("password", { required: "Password is required" })}
    error={!!errors.password}
    helperText={errors.password?.message}
    className="rounded-lg !mb-4"
  />

  {/* Confirm Password */}
  <TextField
    label="Confirm Password"
    placeholder="••••••••"
    fullWidth
    variant="outlined"
    type="password"
    {...register("confirmPassword", { required: "Confirm your password" })}
    error={!!errors.confirmPassword}
    helperText={errors.confirmPassword?.message}
    className="rounded-lg !mb-4"
  />

  {/* Submit Button */}
  <motion.div
    whileHover={!loading ? { scale: 1.05 } : {}}
    whileTap={!loading ? { scale: 0.95 } : {}}
  >
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={loading}
      className="py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                 hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
    >
      {loading ? "Creating Account..." : "Register"}
    </Button>
  </motion.div>
</form>


        <p className="text-center text-gray-700 text-sm mt-6">
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
