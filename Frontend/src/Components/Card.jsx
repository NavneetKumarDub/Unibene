// Product Card

import { Link } from "react-router-dom";
import axios from "axios";

export default function Card({ item, type }) {
  const token = localStorage.getItem("token");

  // add item to cart
  const addToCart = async () => {
    if (!token) return alert("Please login");

    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          productId: item._id,
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

      window.dispatchEvent(new Event("cartUpdated")); // refresh cart count
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex flex-col">
      {/* Image */}
      <Link
        to={`/${type}/${item._id}`}
        className="flex items-center justify-center bg-gray-50 rounded-xl h-44 mb-4"
      >
        <img src={item.image} alt={item.name} className="max-h-36 object-contain" />
      </Link>

      {/* Name */}
      <h3 className="font-semibold text-base mb-1 line-clamp-2">{item.name}</h3>

      {/* Price */}
      <div className="mb-2">
        <p className="text-lg font-bold">₹{item.discountPrice}</p>
        <p className="text-sm text-gray-400 line-through">₹{item.originalPrice}</p>
      </div>

      {/* Discount */}
      <p className="text-green-600 text-sm font-medium mb-3">
        {item.discountPercent}% Student Discount
      </p>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2">
        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className="text-center px-3 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
        >
          Visit Official Store ↗
        </a>

        <button
          onClick={addToCart}
          className="px-3 py-2 text-sm font-medium border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
