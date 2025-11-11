// C:\Users\hp\OneDrive\Desktop\motormines\frontend\src\pages\Admin\AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Users, Truck } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  // const [adminInfo, setAdminInfo] = useState({ name: "Admin", lastLogin: null });
  const [stats, setStats] = useState([
    { title: "Total Orders", value: 0, icon: <ShoppingCart className="text-blue-600 w-6 h-6" /> },
    { title: "Active Products", value: 0, icon: <Package className="text-green-600 w-6 h-6" /> },
    { title: "Total Users", value: 0, icon: <Users className="text-purple-600 w-6 h-6" /> },
    { title: "Out for Delivery", value: 0, icon: <Truck className="text-orange-600 w-6 h-6" /> },
  ]);
  const [adminInfo, setAdminInfo] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [paymentsSummary, setPaymentsSummary] = useState({
    totalSuccess: 0, pending: 0, cod: 0, online: 0, refunds: 0
  });




useEffect(() => {
  const stored = localStorage.getItem("adminInfo");
  if (stored) {
    setAdminInfo(JSON.parse(stored));
  }
}, []);
  // helper to get auth header
  const getHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    // load admin info from localStorage (set at login)
    // const stored = localStorage.getItem("adminInfo");
    // if (stored) setAdminInfo(JSON.parse(stored));

    // fetch dashboard data
    const headers = getHeaders();

    // 1) summary stats (orders, products, users, outForDelivery)
    axios.get("http://localhost:3000/api/reports/summary", { headers })
      .then(res => {
        const d = res.data;
        setStats([
          { title: "Total Orders", value: d.totalOrders || 0, icon: <ShoppingCart className="text-blue-600 w-6 h-6" /> },
          { title: "Active Products", value: d.totalProducts || 0, icon: <Package className="text-green-600 w-6 h-6" /> },
          { title: "Total Users", value: d.totalUsers || 0, icon: <Users className="text-purple-600 w-6 h-6" /> },
          { title: "Out for Delivery", value: d.outForDelivery || 0, icon: <Truck className="text-orange-600 w-6 h-6" /> },
        ]);
      }).catch(()=>{ /* ignore */ });

    // 2) weekly sales
    axios.get("http://localhost:3000/api/reports/weekly-sales", { headers })
      .then(res => {
        // API returns array like [{ day: 'Mon', total: 2000 }, ...]
        setSalesData(res.data.data || []);
      }).catch(()=>{ /* ignore */ });

    // 3) latest orders
    axios.get("http://localhost:3000/api/orders?limit=5", { headers })
      .then(res => setLatestOrders(res.data.orders || []))
      .catch(()=>{ /* ignore */ });

    // 4) notifications (simple endpoint)
    axios.get("http://localhost:3000/api/admin/notifications", { headers })
      .then(res => setNotifications(res.data.notifications || []))
      .catch(()=>{ /* ignore */ });

    // 5) payment summary (total success, pending, cod/online, refunds)
    axios.get("http://localhost:3000/api/reports/payments-summary", { headers })
      .then(res => setPaymentsSummary(res.data))
      .catch(()=>{ /* ignore */ });

  }, []);

  // clickable card actions
  const onCardClick = (title) => {
    switch(title) {
      case "Total Orders": navigate("/admin/orders"); break;
      case "Active Products": navigate("/admin/products"); break;
      case "Total Users": navigate("/admin/users"); break;
      case "Out for Delivery": navigate("/admin/shipping"); break;
      default: break;
    }
  };

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🧭 Admin Dashboard</h1>
         <p className="text-gray-600 mt-1">
  Welcome back, <span className="font-semibold text-blue-700">{adminInfo.name || "Admin"}</span> 👋
</p>

          {adminInfo.lastLogin && (
            <p className="text-sm text-gray-500">Last login: {new Date(adminInfo.lastLogin).toLocaleString()}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-4">
            <div className="text-sm text-gray-500">Account status</div>
            <div className="font-semibold text-green-600">Active</div>
          </div>
          <Button onClick={() => navigate("/admin/reports")} className="bg-blue-600 hover:bg-blue-700 text-white">
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="shadow-md border-t-4 border-blue-500 cursor-pointer" onClick={()=>onCardClick(s.title)}>
              <CardContent className="flex items-center gap-4 py-6 px-5">
                <div className="p-3 bg-gray-100 rounded-full">{s.icon}</div>
                <div>
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">📊 Weekly Sales Overview</h2>
            <div className="text-sm text-gray-600">Total Revenue: ₹{paymentsSummary.totalSuccess || 0}</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData.length ? salesData : [
              { name: "Mon", sales: 2000 },
              { name: "Tue", sales: 4500 },
              { name: "Wed", sales: 3800 },
              { name: "Thu", sales: 5200 },
              { name: "Fri", sales: 6100 },
              { name: "Sat", sales: 4800 },
              { name: "Sun", sales: 7500 },
            ]}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <Card className="shadow-md">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">🛍️ Latest Orders</h3>
              <Button size="sm" onClick={() => navigate("/admin/orders")}>View all</Button>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              {latestOrders.length ? latestOrders.map(o => (
                <li key={o._id}>
                  Order #{String(o._id).slice(-6)} — <strong>₹{o.totalAmount}</strong> — {o.orderStatus}
                </li>
              )) : (
                <>
                  <li>Order #1023 — <strong>₹1299</strong> — Delivered</li>
                  <li>Order #1024 — <strong>₹2199</strong> — Shipped</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-md">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">🔔 Notifications</h3>
              <Button size="sm" onClick={() => navigate("/admin/notifications")}>See all</Button>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              {notifications.length ? notifications.map((n, idx) => (
                <li key={idx}>{n.message} <span className="text-xs text-gray-400">({new Date(n.createdAt).toLocaleString()})</span></li>
              )) : (
                <>
                  <li>New user registered (Ravi Kumar)</li>
                  <li>Product “Engine Oil Pro” stock low (3 left)</li>
                  <li>Payment success via Razorpay</li>
                </>
              )}
            </ul>

            {/* Payment quick summary */}
            <div className="mt-4 text-sm text-gray-700">
              <div>Successful payments sum: <strong>₹{paymentsSummary.totalSuccess}</strong></div>
              <div>Pending payments: <strong>{paymentsSummary.pending}</strong></div>
              <div>COD: <strong>{paymentsSummary.cod}</strong> | Online: <strong>{paymentsSummary.online}</strong></div>
              <div>Refunds issued: <strong>₹{paymentsSummary.refunds}</strong></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
