// frontend/src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

// ✅ Note: Tumhara original form component bilkul untouched hai
import ContactForm from "./ContactForm"; // tumhare form ko alag file mai export karo
import Footer from "../components/Footer";
const Contact = () => {
    // background glow animation
    useEffect(() => {
        anime({
            targets: ".background-glow",
            scale: [0.8, 1.1],
            opacity: [0, 0.4],
            easing: "easeOutExpo",
            duration: 1200,
            loop: true,
            direction: "alternate",
        });
    }, []);

    return (
        <>

        <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">

            {/* 🌟 Background Glowing Circles */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl top-10 left-10 background-glow"></div>
            <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl bottom-10 right-10 background-glow"></div>

            {/* 🌐 Hero / Page Title */}
            <div className="text-center py-16 px-6">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    We'd love to hear from you! Reach out for support, feedback or any queries about <span className="text-blue-600 font-semibold">MotorMines</span>.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-28 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* ✅ Left Side - Company Info, Map, Social */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Address & Contact */}
                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Office</h2>
                        <p className="text-gray-700 mb-2">📍 Skyway IT Solution,Gandhinagar, Gujarat, India</p>
                        <p className="text-gray-700 mb-2">📞 +91 8000067693</p>
                        <p className="text-gray-700">📧 support@motormines.com</p>
                    </div>

                    {/* Google Map */}
                    <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
                        <iframe
                            title="MotorMines Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.7562722365833!2d72.6572576!3d23.2403875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b0047611aa1%3A0xcb3cb6b0bed7c87a!2sSkyway%20IT%20Solution!5e1!3m2!1sen!2sin!4v1763186739877!5m2!1sen!2sin"
                            width="100%"
                            height="280"
                            className="border-0 w-full"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* Social Links */}
                    {/* <div className="flex space-x-6 justify-center lg:justify-start">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">🌐</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">📘</a>
            <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl">📸</a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl">🐦</a>
          </div> */}
                </motion.div>

                {/* ✅ Right Side - Original Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <ContactForm />
                </motion.div>
            </div>

            {/* FAQs Section */}
            {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mt-16 px-6 text-center space-y-8"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">FAQs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">How can I get a quote?</h3>
                        <p className="text-gray-600 text-sm">You can contact us via the form or call our support number.</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">Do you ship nationwide?</h3>
                        <p className="text-gray-600 text-sm">Yes! Our submersible pumps are delivered across India.</p>
                    </div>
                </div>
            </motion.div> */}
        </div>
        </>
    );
};

export default Contact;
        <Footer/>   
