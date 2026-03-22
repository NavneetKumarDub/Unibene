import { useEffect, useState } from "react";
import axios from "axios";

const typeColors = {
  Course: "bg-purple-100 text-purple-700",
  Technology: "bg-blue-100 text-blue-700",
  Software: "bg-green-100 text-green-700",
};

const AdminCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/admin/carts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCarts(res.data.data);
      } catch (error) {
        console.error("Failed to load carts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-gray-500 text-sm">
        Loading carts...
      </p>
    );
  }

  if (carts.length === 0) {
    return (
      <p className="p-6 text-gray-500 text-sm">
        No carts found.
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ===== PAGE TITLE ===== */}
      <h2 className="text-2xl font-bold text-gray-800">
        🛒 Cart Management
      </h2>

      {carts.map((cart) => (
        <div
          key={cart._id}
          className="bg-white rounded-2xl shadow-lg border p-5"
        >
          {/* USER HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">
              👤 {cart.user?.name}
              <span className="text-sm text-gray-500 ml-2">
                ({cart.user?.email})
              </span>
            </h3>

            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
              {cart.items.length} items
            </span>
          </div>

          {/* EMPTY CART */}
          {cart.items.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Cart is empty
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Product
                    </th>
                    <th className="px-4 py-3 text-center">
                      Type
                    </th>
                    <th className="px-4 py-3 text-center">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-center">
                      Qty
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {cart.items.map((item) => (
                    <tr key={item._id}>
                      <td className="px-4 py-3">
                        {item.productId?.name}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            typeColors[item.productType] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.productType}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center font-semibold text-green-600">
                        {item.productId?.discountPercent}%
                      </td>

                      <td className="px-4 py-3 text-center">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminCarts;
