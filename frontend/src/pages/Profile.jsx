import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
        if (data.success) {
          setFormData({
            fullname: data.user.fullname,
            email: data.user.email,
            contact: data.user.contact || "",
          });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { data } = await axios.put("http://localhost:3000/users/profile", formData, { withCredentials: true });
      if (data.success) {
        setUser(data.user); // context update
        setMessage("Profile updated successfully ✅");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("Error updating profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Profile</h2>

      {message && (
        <p
          className={`text-sm mb-3 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
