import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });

      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAllUsers();
  }, [user]);

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr, idx) => (
              <tr key={usr._id}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{usr.fullname}</td>
                <td className="border p-2">{usr.email}</td>
              {new Date(usr.createdAt).toLocaleDateString()}

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
