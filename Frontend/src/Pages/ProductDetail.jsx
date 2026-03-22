// Product Detail Page

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/deals/${type}/${id}`
      );
      setProduct(res.data.data);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // add to cart
  const addToCart = async () => {
    if (!token) return alert("Please login");

    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          productId: product._id,
          productType:
            type === "technology"
              ? "Technology"
              : type === "course"
              ? "Course"
              : "Software",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      alert("Added to cart");
    } catch {
      alert("Add to cart failed");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, type]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-600 mb-2">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>

          <p className="text-green-600 font-semibold mb-4">
            {product.discountPercent}% Student Discount
          </p>

          <div className="mb-4">
            <span className="text-2xl font-bold">
              ₹{product.discountPrice}
            </span>
            <span className="ml-3 line-through text-gray-400">
              ₹{product.originalPrice}
            </span>
          </div>

          <a
            href={product.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block mb-6 px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Visit Official Website ↗
          </a>

          <button
            onClick={addToCart}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
