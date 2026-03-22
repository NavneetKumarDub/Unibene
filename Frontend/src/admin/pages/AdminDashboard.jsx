// Admin Dashboard

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

  // fetch dashboard stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.data);
    } catch (err) {
      console.error("Stats load failed", err);
    }
  };

  if (!stats) return <p className="p-6">Loading...</p>;

  // chart data
  const chartData = [
    { name: "Courses", count: stats.courseCount },
    { name: "Technology", count: stats.techCount },
    { name: "Software", count: stats.softwareCount },
  ];

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={stats.totalUsers} color="#6366F1" />
          <StatCard title="Total Products" value={stats.totalProducts} color="#0F172A" />
          <StatCard title="Active Carts" value={stats.activeCarts} color="#F59E0B" />
        </div>
      </section>

      {/* Category stats */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Products by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Courses" value={stats.courseCount} color="#3B82F6" />
          <StatCard title="Technology" value={stats.techCount} color="#8B5CF6" />
          <StatCard title="Software" value={stats.softwareCount} color="#10B981" />
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                <Cell fill="#3B82F6" />
                <Cell fill="#8B5CF6" />
                <Cell fill="#10B981" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <ActivityItem text="New user registered" />
          <ActivityItem text="Product added by admin" />
          <ActivityItem text="User updated cart" />
          <ActivityItem text="Discount applied" />
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <ActionButton label="+ Add Product" link="/admin/products" />
          <ActionButton label="Manage Users" link="/admin/users" />
          <ActionButton label="View Carts" link="/admin/carts" />
        </div>
      </section>
    </div>
  );
}

// Small components

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border-l-4" style={{ borderColor: color }}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
    </div>
  );
}

function ActivityItem({ text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-700">
      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
      {text}
    </div>
  );
}

function ActionButton({ label, link }) {
  return (
    <a
      href={link}
      className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium"
    >
      {label}
    </a>
  );
}
