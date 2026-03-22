import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("technology");
  const [form, setForm] = useState({
    name: "",
    brand: "",
    originalPrice: "",
    discountPrice: "",
    image: "",
    link: "",
    source: "admin",
  });

  const discountPercent =
    form.originalPrice && form.discountPrice
      ? Math.round(
          ((form.originalPrice - form.discountPrice) /
            form.originalPrice) *
            100
        )
      : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/admin/products/${type}`,
        {
          ...form,
          discountPercent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/products");
    } catch (err) {
      console.error("Add product failed:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="technology">Technology</option>
            <option value="course">Course</option>
            <option value="software">Software</option>
          </select>

          <input name="name" placeholder="Product name" required className="input" onChange={handleChange} />
          <input name="brand" placeholder="Brand" className="input" onChange={handleChange} />

          <div className="grid grid-cols-2 gap-3">
            <input name="originalPrice" type="number" placeholder="Original price" required className="input" onChange={handleChange} />
            <input name="discountPrice" type="number" placeholder="Discount price" required className="input" onChange={handleChange} />
          </div>

          <p className="text-sm text-gray-500">
            Discount: <strong>{discountPercent}%</strong>
          </p>

          <input name="image" placeholder="Image URL" required className="input" onChange={handleChange} />
          <input name="link" placeholder="Product link" required className="input" onChange={handleChange} />

          <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                         text-white py-3 rounded-xl font-medium 
                          hover:opacity-90 transition"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
