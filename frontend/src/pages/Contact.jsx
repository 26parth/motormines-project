import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    anime({
      targets: ".contact-card",
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
    });

    anime({
      targets: ".glow",
      opacity: [0, 0.4],
      translateY: [-20, 0],
      duration: 1500,
      easing: "easeOutQuad",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-6 relative overflow-hidden">

      {/* Background Glowing Circles */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-500/30 blur-3xl top-10 left-10 glow"></div>
      <div className="absolute w-72 h-72 rounded-full bg-purple-500/30 blur-3xl bottom-10 right-10 glow"></div>

      {/* CARD */}
      <motion.div
        className="contact-card z-20 w-full max-w-2xl bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Contact Us ✉️
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We're here to help you with <span className="text-blue-600 font-semibold">MotorMines</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Input Group */}
          <div className="relative group">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="peer w-full px-4 py-3 bg-white border border-gray-400 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <label
              className="absolute left-4 top-3 text-gray-600 bg-white px-1 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Your Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="peer w-full px-4 py-3 bg-white border border-gray-400 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <label
              className="absolute left-4 top-3 text-gray-600 bg-white px-1 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email Address
            </label>
          </div>

          <div className="relative group">
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="peer w-full px-4 py-3 bg-white border border-gray-400 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
            ></textarea>

            <label
              className="absolute left-4 top-3 text-gray-600 bg-white px-1 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 
              peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Message
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg 
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-lg"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
