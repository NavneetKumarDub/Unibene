import { useState } from "react";
import axios from "axios";

/**
 usable form for adding Technology, Course, or Software
 */
const AddProductForm = ({ type, onClose, onAdded }) => {
  const [form, setForm] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    discountPercent: "",
    brand: "",
    category: "",
    image: "",
    source: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/admin/products/${type}`,
        {
          ...form,
          originalPrice: Number(form.originalPrice),
          discountPrice: Number(form.discountPrice),
          discountPercent: Number(form.discountPercent),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAdded();
      onClose();
    } catch (error) {
      console.error("Add product failed:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="brand" placeholder="Brand" onChange={handleChange} />
      <input
        name="originalPrice"
        placeholder="Original Price"
        onChange={handleChange}
        required
      />
      <input
        name="discountPrice"
        placeholder="Discount Price"
        onChange={handleChange}
        required
      />
      <input
        name="discountPercent"
        placeholder="Discount Percent"
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        required
      />
      <input
        name="source"
        placeholder="Source"
        onChange={handleChange}
        required
      />
      <input
        name="link"
        placeholder="Link"
        onChange={handleChange}
        required
      />

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
