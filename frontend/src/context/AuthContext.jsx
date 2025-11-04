import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Always send cookies with requests
  axios.defaults.withCredentials = true;

  // 🔹 Fetch user profile from backend
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users/profile");
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null); // ❗ ensure no old user stays
      console.log("No active session");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout handler
const logout = async () => {
  try {
    await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
    setUser(null);  // ✅ clear state immediately
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  // 🔹 Run on app start
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchProfile, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
