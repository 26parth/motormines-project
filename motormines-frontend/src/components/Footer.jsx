import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1 - Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-3">MotorMines</h2>
          <p className="text-gray-400">
            Delivering durable and efficient submersible pumps for homes,
            industries, and agriculture across India.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>

        {/* Column 3 - Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-5 text-2xl">
            <a href="#" className="hover:text-blue-500">🌐</a>
            <a href="#" className="hover:text-blue-500">📘</a>
            <a href="#" className="hover:text-blue-500">📸</a>
            <a href="#" className="hover:text-blue-500">🐦</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MotorMines. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
