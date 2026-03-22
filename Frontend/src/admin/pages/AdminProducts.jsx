import { useEffect, useState } from "react";
import axios from "axios";
import ProductRow from "../components/ProductRow";
import AddProductForm from "../components/AddProductForm";

const TABS = ["technology", "course", "software"];

const tabColors = {
  technology: "from-blue-600 to-indigo-600",
  course: "from-purple-600 to-pink-600",
  software: "from-green-600 to-emerald-600",
};

const AdminProducts = () => {
  const [type, setType] = useState("technology");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/products/${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(res.data.data);
    } catch (error) {
      console.error("Fetch products failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [type]);

  return (
    <div className="p-6 space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          📦 Product Management
        </h2>

        <button
          onClick={() => setShowAdd(true)}
          className={`px-5 py-2 rounded-lg text-white text-sm font-semibold
          bg-gradient-to-r ${tabColors[type]} hover:opacity-90 transition`}
        >
          + Add {type.toUpperCase()}
        </button>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setType(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                type === tab
                  ? `bg-gradient-to-r ${tabColors[tab]} text-white shadow`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ===== TABLE ===== */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
          <table className="w-full text-sm">
            <thead
              className={`bg-gradient-to-r ${tabColors[type]} text-white`}
            >
              <tr>
                <th className="px-5 py-3 text-left font-semibold">
                  Name
                </th>
                <th className="px-5 py-3 text-left font-semibold">
                  Brand
                </th>
                <th className="px-5 py-3 text-left font-semibold">
                  Discount
                </th>
                <th className="px-5 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-8 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                    type={type}
                    refresh={fetchProducts}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== ADD PRODUCT MODAL ===== */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Add {type.toUpperCase()}
              </h3>

              <button
                onClick={() => setShowAdd(false)}
                className="text-gray-500 hover:text-gray-800 text-lg"
              >
                ✕
              </button>
            </div>

            <AddProductForm
              type={type}
              onClose={() => setShowAdd(false)}
              onAdded={fetchProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
