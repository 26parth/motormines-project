import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Users, Truck } from "lucide-react";

const AdminDashboard = () => {
  // 🧮 Fake analytics data (replace with API later)
  const salesData = [
    { name: "Mon", sales: 2000 },
    { name: "Tue", sales: 4500 },
    { name: "Wed", sales: 3800 },
    { name: "Thu", sales: 5200 },
    { name: "Fri", sales: 6100 },
    { name: "Sat", sales: 4800 },
    { name: "Sun", sales: 7500 },
  ];

  const stats = [
    { title: "Total Orders", value: 328, icon: <ShoppingCart className="text-blue-600 w-6 h-6" /> },
    { title: "Active Products", value: 87, icon: <Package className="text-green-600 w-6 h-6" /> },
    { title: "Total Users", value: 1421, icon: <Users className="text-purple-600 w-6 h-6" /> },
    { title: "Out for Delivery", value: 16, icon: <Truck className="text-orange-600 w-6 h-6" /> },
  ];

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🧭 Admin Dashboard
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          View Reports
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-md border-t-4 border-blue-500">
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
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📊 Weekly Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
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
            <h3 className="text-lg font-semibold mb-3">🛍️ Latest Orders</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Order #1023 — <strong>₹1299</strong> — Delivered</li>
              <li>Order #1024 — <strong>₹2199</strong> — Shipped</li>
              <li>Order #1025 — <strong>₹499</strong> — Processing</li>
              <li>Order #1026 — <strong>₹899</strong> — Out for Delivery</li>
            </ul>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-md">
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold mb-3">🔔 Notifications</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>New user registered (Ravi Kumar)</li>
              <li>Product “Engine Oil Pro” stock low (3 left)</li>
              <li>Payment success via Razorpay</li>
              <li>2 orders delivered today</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
