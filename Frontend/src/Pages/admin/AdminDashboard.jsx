import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-500">UniBene</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/admin"
            className="block px-4 py-2 rounded-lg bg-black text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Users
          </Link>

          <Link
            to="/admin/products"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Products
          </Link>

          <Link
            to="/admin/carts"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Carts
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Users" value="—" />
          <StatCard title="Total Products" value="—" />
          <StatCard title="Active Carts" value="—" />
          <StatCard title="Revenue" value="—" />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);

export default AdminDashboard;
