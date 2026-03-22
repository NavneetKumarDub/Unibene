import axios from "axios";

const ProductRow = ({ product, type, refresh }) => {
  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/admin/products/${type}/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();
    } catch (err) {
      console.error("Delete product failed:", err);
    }
  };

  return (
    <tr className="border-t">
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3">{product.brand || "—"}</td>
      <td className="px-4 py-3">
        {product.discountPercent}%
      </td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
