import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// 🛒 Professional Orders Page (Flipkart/Amazon style)
const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // Assuming backend sends: { success: true, orders: [...] }
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // 🎨 Status colors
  const statusColors = {
    processing: "text-blue-500",
    packed: "text-yellow-600",
    shipped: "text-orange-500",
    out_for_delivery: "text-purple-600",
    delivered: "text-green-600",
    cancelled: "text-red-600",
  };

  // 🧾 Invoice Download Handler
  const handleInvoiceDownload = (order) => {
    const invoiceText = `
INVOICE
==========================
Order ID: ${order._id}
Amount: ₹${order.amount}
Status: ${order.status}
Payment: ${order.payment.method} (${order.payment.status})
--------------------------
Items:
${order.items.map((i) => `- ${i.title} x${i.quantity} = ₹${i.price}`).join("\n")}
--------------------------
Address:
${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}
==========================
Thank you for shopping with MotorMines!
    `;

    const blob = new Blob([invoiceText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${order._id}.txt`;
    link.click();
  };

  if (loading) return <div className="p-6 text-gray-500">Loading your orders...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🛍️ Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">
                  🧾 Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <span className={`font-medium ${statusColors[order.status]}`}>
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              {/* Items */}
              <div className="border-t pt-3 mb-3">
                <strong className="block mb-2 text-gray-700">Items:</strong>
                <ul className="ml-4 space-y-1 text-gray-600">
                  {order.items.map((i) => (
                    <li key={i.productId}>
                      <span className="font-medium">{i.title}</span> × {i.quantity} – ₹{i.price}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment & Address */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>💰 <strong>Amount:</strong> ₹{order.amount}</p>
                <p>💳 <strong>Payment:</strong> {order.payment.method} ({order.payment.status})</p>
                <p>📍 <strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pincode}</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => handleInvoiceDownload(order)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Download Invoice
                </button>
                <button className="px-4 py-2 border border-gray-400 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
