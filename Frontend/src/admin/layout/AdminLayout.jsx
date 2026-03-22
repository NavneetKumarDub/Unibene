import { NavLink, Outlet ,Link} from "react-router-dom";
import {
  Users,
  Package,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";

export default function AdminLayout() {
  // Get logged-in admin info
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r shadow-sm">
        {/* Brand */}
        <div className="p-5 border-b">
          <Link to="/">
          <h1 className="text-xl font-bold">
            <span className="text-blue-600">UniBene</span>{" "}
            <span className="text-gray-500 text-sm">Admin</span>
          </h1>
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          <SidebarItem
            to="/admin/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            color="blue"
          />
          <SidebarItem
            to="/admin/users"
            icon={<Users size={18} />}
            label="Users"
            color="purple"
          />
          <SidebarItem
            to="/admin/products"
            icon={<Package size={18} />}
            label="Products"
            color="green"
          />
          <SidebarItem
            to="/admin/carts"
            icon={<ShoppingCart size={18} />}
            label="Carts"
            color="orange"
          />
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOP BAR ===== */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Admin Dashboard
          </h2>

          {/* Admin Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white
                            flex items-center justify-center font-semibold">
              {user?.name?.charAt(0) || "A"}
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "admin"}
              </p>
            </div>

            {/* Online indicator */}
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */

function SidebarItem({ to, icon, label, color }) {
  const colors = {
    blue: "hover:bg-blue-50 text-blue-600",
    purple: "hover:bg-purple-50 text-purple-600",
    green: "hover:bg-green-50 text-green-600",
    orange: "hover:bg-orange-50 text-orange-600",
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
            : `text-gray-700 ${colors[color]}`
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
