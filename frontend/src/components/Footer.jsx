// frontend/src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6 md:px-16 lg:px-28">

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold mb-3 tracking-wide">MotorMines</h2>
          <p className="text-blue-100 leading-relaxed">
            Durable and energy-efficient submersible pumps trusted across India.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-200">🌐</a>
            {/* <a href="#" className="hover:text-gray-200">📘</a> */}
            {/* <a href="#" className="hover:text-gray-200">📸</a> */}
            {/* <a href="#" className="hover:text-gray-200">🐦</a> */}
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-blue-500 mt-10 pt-4 text-center text-blue-200 text-sm">
        © {new Date().getFullYear()} MotorMines — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
