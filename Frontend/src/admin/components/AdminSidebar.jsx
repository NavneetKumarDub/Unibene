import { NavLink} from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-6 text-2xl font-bold tracking-tight">
        UniBene <span className="text-sm text-gray-400">Admin</span>
      </div>

      <nav className="px-4 space-y-1">
        <SidebarLink to="/admin/dashboard" label="Dashboard" />
        <SidebarLink to="/admin/users" label="Users" />
        <SidebarLink to="/admin/products" label="Products" />
        <SidebarLink to="/admin/carts" label="Carts" />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg text-sm font-medium transition
       ${
         isActive
           ? "bg-black text-white"
           : "text-gray-700 hover:bg-gray-100"
       }`
    }
  >
    {label}
  </NavLink>
);

export default AdminSidebar;
