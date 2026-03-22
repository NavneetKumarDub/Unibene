/**
 * Cart.jsx
 *
 * Displays cart items for logged-in user.
 * Allows item removal and shows order summary.
 * Fully aligned with backend Cart schema.
 */

import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  /**
   * Fetch user cart
   */
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove item from cart
   */
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Remove cart item failed", error);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading cart...</div>;
  }

  if (!items.length) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Cart is empty
      </div>
    );
  }

  /**
   * Price calculations
   */
  const totalOriginalPrice = items.reduce(
    (sum, item) =>
      sum +
      (item.productId?.originalPrice || 0) * item.quantity,
    0
  );

  const totalDiscountPrice = items.reduce(
    (sum, item) =>
      sum +
      (item.productId?.discountPrice || 0) * item.quantity,
    0
  );

  const totalSavings = totalOriginalPrice - totalDiscountPrice;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div
                key={product._id}
                className="flex justify-between items-start gap-6 bg-white rounded-2xl p-4
                           shadow-sm hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300"
              >
                <div className="flex gap-4">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-50 flex items-center justify-center w-32 h-24 rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-20 max-w-[85%] object-contain"
                    />
                  </a>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600">
                      Brand: {product.brand}
                    </p>

                    <p className="text-green-600 text-sm font-medium mt-1">
                      {product.discountPercent}% Student Discount
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-2 px-3 py-1.5
                                 text-sm font-medium text-gray-700
                                 border border-gray-300 rounded-md
                                 hover:bg-gray-100 transition"
                    >
                      Visit Official Store ↗
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    <p className="font-semibold text-xl">
                      ₹{product.discountPrice * item.quantity}
                    </p>
                    <p className="text-sm line-through text-gray-400">
                      ₹{product.originalPrice * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(product._id)}
                    className="mt-4 px-4 py-2 border border-red-400
                               text-red-500 rounded-lg text-sm
                               hover:bg-red-500 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Total MRP</span>
            <span>₹{totalOriginalPrice}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">
              - ₹{totalSavings}
            </span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span>₹{totalDiscountPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
