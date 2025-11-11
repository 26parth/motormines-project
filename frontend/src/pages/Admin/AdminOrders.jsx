import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // const token = localStorage.getItem("token"); // 👈 Auth token agar required ho
        const res = await axios.get("http://localhost:3000/api/admin/orders", {
            withCredentials: true
          // headers: { Authorization: `Bearer ${token}` },
        });


        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders (Admin)</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">
                  {order.user?.name || "Unknown"} <br />
                  <span className="text-xs text-gray-500">{order.user?.email}</span>
                </td>
                <td className="p-2 border">₹{order.amount}</td>
                <td className="p-2 border">
                  {order.payment.method} ({order.payment.status})
                </td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
