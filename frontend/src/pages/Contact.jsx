import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Thank you for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-16 lg:px-32">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE - Contact Info */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-6">
            Have questions about our submersible pumps or need help choosing the
            right one? We’d love to hear from you.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">📞 Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span>{" "}
              support@motormines.com
            </p>
            <p>
              <span className="font-semibold">📍 Address:</span> 12 Industrial
              Estate, Rajkot, Gujarat, India
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Feedback Form */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-blue-700">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message / Feedback
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
