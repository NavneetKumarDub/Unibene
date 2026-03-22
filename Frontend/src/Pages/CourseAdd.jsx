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
    image: ""
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
        "http://localhost:3000/api/deals/course/createcourse",
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
        setMessage("Course product added successfully");
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
        Add Course Product
      </h2>

      {message && (
        <p className="mb-4 text-sm text-red-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-5">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          rows="3"
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          />

          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          />
        </div>

        <input
          type="text"
          name="link"
          placeholder="Product Link"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            className="border px-4 py-2 rounded-md bg-white"
          />

          <select
            name="category"
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md bg-white"
          >
            <option value="">Select Category</option>
            <option value="programming">Programming</option>
            <option value="data_science">Data_science</option>
            <option value="web_development">Ai_ml</option>
            <option value="mobile_development">mobile_development</option>
            <option value="cybersecurity">cybersecurity</option>
            <option value="cloud_computing">cloud_computing</option>
            <option value="design">design</option>
            <option value="business">business</option>
            <option value="marketing">marketing</option>
            <option value="finance">inance</option>
            <option value="language_learning">language_learning</option>
            <option value="personal_development">personal_development</option>
            <option value="exam_prep">exam_prep</option>
          </select>
        </div>

        <input
          type="text"
          name="source"
          placeholder="Source (Amazon, Flipkart, etc.)"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded-md bg-white"
        />

        {/* ONLY CHANGE: image URL instead of file */}
        <input
          type="text"
          name="image"
          placeholder="Image url"
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