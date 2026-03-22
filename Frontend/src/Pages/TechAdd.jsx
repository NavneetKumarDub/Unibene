import { useState } from "react";

export default function AddTech() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    originalPrice: "",
    discountPrice: "",
    link: "",
    brand: "",
    category: "",
    source: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const original = Number(formData.originalPrice);
    const discount = Number(formData.discountPrice);

    if (discount > original) {
      setMessage("Discount price cannot be greater than original price");
      return;
    }

    const discountPercent =
      original > 0
        ? (((original - discount) / original) * 100).toFixed(2)
        : 0;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:3000/api/deals/technology/createtech",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            discountPercent,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        setMessage("Technology product added successfully");
        setFormData({
          name: "",
          description: "",
          originalPrice: "",
          discountPrice: "",
          link: "",
          brand: "",
          category: "",
          source: "",
          image: "",
        });
      } else {
        setMessage(result.message || "Failed to add product");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Technology Product
      </h2>

      {message && (
        <p className="mb-4 text-sm text-red-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
        <input
          name="name"
          value={formData.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          rows="3"
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            placeholder="Original Price"
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          />

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            placeholder="Discount Price"
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          />
        </div>

        <input
          type="text"
          name="link"
          value={formData.link}
          placeholder="Product Link"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            value={formData.brand}
            placeholder="Brand"
            onChange={handleChange}
            className="border px-4 py-2 rounded-md bg-white"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          >
            <option value="">Select Category</option>
            <option value="laptop">Laptop</option>
            <option value="mobile">Mobile</option>
            <option value="accessory">Accessory</option>
            <option value="tablet">Tablet</option>
            <option value="monitor">Monitor</option>
            <option value="audio">Audio</option>
            <option value="gaming">Gaming</option>
            <option value="smartwatch">Smartwatch</option>
          </select>
        </div>

        <input
          type="text"
          name="source"
          value={formData.source}
          placeholder="Source (Amazon, Flipkart, etc.)"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}