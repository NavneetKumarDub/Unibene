const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="text-sm text-gray-500">
        Logged in as <span className="font-medium text-gray-700">Admin</span>
      </div>
    </header>
  );
};

export default AdminHeader;
