import { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "../components/UserRow";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.data);
    } catch (err) {
      console.error("Fetch users failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          👥 User Management
        </h2>

        <span className="px-4 py-1 rounded-full text-sm font-medium
                         bg-blue-100 text-blue-700">
          Total Users: {users.length}
        </span>
      </div>

      {/* ===== CONTENT ===== */}
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
          <table className="w-full text-sm">
            {/* TABLE HEAD */}
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">
                  Name
                </th>
                <th className="text-left px-5 py-3 font-semibold">
                  Email
                </th>
                <th className="text-left px-5 py-3 font-semibold">
                  Role
                </th>
                <th className="text-right px-5 py-3 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y">
              {users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  refresh={fetchUsers}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
