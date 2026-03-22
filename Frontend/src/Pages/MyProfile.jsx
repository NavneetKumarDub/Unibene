import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  /* ================= FETCH USER ================= */
  const fetchUser = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/users/getUser",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(res.data.data);
    setName(res.data.data.name);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ================= IMAGE ================= */
  const openFilePicker = () => fileInputRef.current.click();
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadImage = async () => {
    if (!file) return alert("Select image first");

    const formData = new FormData();
    formData.append("profileImg", file);

    await axios.put(
      "http://localhost:3000/api/users/updateProfile",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchUser();
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/users/updateProfile",
        { name, oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditMode(false);
      setOldPassword("");
      setNewPassword("");
      fetchUser();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ================= LEFT CARD ================= */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="relative mx-auto w-36 h-36 mb-4">
              <img
                src={
                  user.profileImg.startsWith("http")
                    ? user.profileImg
                    : `http://localhost:3000${user.profileImg}`
                }
                className="w-full h-full rounded-full object-cover border-4 border-white shadow"
              />
            </div>

            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />

            <button
              onClick={openFilePicker}
              className="w-full mb-2 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
            >
              Choose Image
            </button>

            <button
              onClick={uploadImage}
              className="w-full py-2 rounded-lg bg-black text-white"
            >
              Upload
            </button>

            <h3 className="mt-5 text-lg font-semibold">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>

            {/* 🔥 ADMIN ONLY BUTTON (ADDED) */}
            {user.role === "admin" && (
            <button
                onClick={() => navigate("/admin/dashboard")}
                className="
                  mt-5 w-full py-2 rounded-lg
                  bg-indigo-600 text-white text-sm font-medium
                  hover:bg-indigo-700 transition
                "
            >
            Go to Admin Dashboard
            </button>
          )}

          </div>

          {/* ================= RIGHT CARD ================= */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Account Details</h2>

              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Info label="Email" value={user.email} />
              <Info label="Gender" value={user.gender} />
              <Info label="Role" value={user.role} />
            </div>

            {editMode && (
              <>
                <hr className="my-8" />

                <h3 className="font-semibold mb-4">
                  Update Profile
                </h3>

                <div className="space-y-4">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                  />

                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                  />

                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={updateProfile}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-4 py-2 rounded-lg border border-gray-300
               focus:ring-2 focus:ring-black outline-none"
  />
);

export default MyProfile;
