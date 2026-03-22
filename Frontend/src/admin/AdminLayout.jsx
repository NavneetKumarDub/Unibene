import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
