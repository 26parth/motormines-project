import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Always send cookies
  axios.defaults.withCredentials = true;

  // Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/profile");
      if (res.data.success) {
        setAdmin(res.data.admin);
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.log("No active admin session");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/admin/logout");
      setAdmin(null);
    } catch (err) {
      console.error("Admin logout error:", err);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, fetchAdminProfile, adminLogout, loading }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
