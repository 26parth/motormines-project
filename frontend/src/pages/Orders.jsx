import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Steps = ({ status }) => {
  const steps = ["processing","packed","shipped","out_for_delivery","delivered"];
  return (
    <div className="flex gap-3 items-center">
      {steps.map((s, idx) => {
        const active = steps.indexOf(s) <= steps.indexOf(status);
        return (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}>{idx+1}</div>
            <div className="text-xs">{s.replace(/_/g," ")}</div>
            {idx < steps.length - 1 && <div style={{width:40, height:2}} className={`${active ? "bg-blue-600" : "bg-gray-300"}`}></div>}
          </div>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get("http://localhost:3000/orders", { withCredentials: true });
        if (res.data.success) setOrders(res.data.orders);
      } catch (err) {
        console.error("fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to see orders.</p>;
  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="border rounded p-4 bg-white shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Order #{order._id.slice(-6)} — ₹{order.amount}</h3>
                <p className="text-sm text-gray-600">Placed: {new Date(order.createdAt).toLocaleString()}</p>
                <p className="text-sm">Payment: {order.payment?.method} — {order.payment?.status}</p>
              </div>
              <div className="text-sm text-gray-700">
                <p>Status: <strong>{order.status}</strong></p>
                <p>Items: {order.items.length}</p>
              </div>
            </div>

            <div className="mt-3">
              <Steps status={order.status} />
            </div>

            <div className="mt-3">
              {order.items.map(i => (
                <div key={i.productId} className="flex items-center gap-3 border-t pt-3">
                  <img src={i.img} alt={i.title} className="w-16 h-16 object-cover rounded"/>
                  <div>
                    <div className="font-semibold">{i.title}</div>
                    <div className="text-sm text-gray-600">Qty: {i.quantity} — ₹{i.price}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
