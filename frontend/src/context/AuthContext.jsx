// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import userApi from "../api/userApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await userApi.get("/profile"); 
      setUser(res.data.user || null);
    } catch (err) {
      // ✅ handle logout 401 silently
      if (err.response?.status === 401) {
        setUser(null);
        console.log("User not logged in");
      } else {
        console.error("Profile fetch error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await userApi.post("/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

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
