import axios from "axios";

const UserRow = ({ user, refresh }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();
    } catch (err) {
      console.error("Delete user failed:", err);
    }
  };

  return (
    <tr className="border-t">
      <td className="px-4 py-3">{user.name || "—"}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3 capitalize">{user.role}</td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
