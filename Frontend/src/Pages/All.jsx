import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import SortBar from "../Components/SortBar";
import Card from "../Components/Card";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";

export default function All() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // course | technology | software
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const brandFromUrl = searchParams.get("brand");

  const allCategories = [
    { label: "Courses", value: "course" },
    { label: "Technology", value: "technology" },
    { label: "Software", value: "software" },
  ];

  useEffect(() => {
    fetchAllProducts();
  }, [page, category, sort, searchParams]);

  const fetchAllProducts = async () => {
    try {
      const params = new URLSearchParams({
        page,
        type: category,
        sort,
      });

      if (brandFromUrl) {
        params.append("brand", brandFromUrl);
      }

      const res = await fetch(
        `http://localhost:3000/api/search/page?${params.toString()}`
      );
      const json = await res.json();

      setProducts(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch all products", error);
      setProducts([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">All Student Discounts</h2>

      {/* FILTER + SORT */}
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterBar
          category={category}
          setCategory={(val) => {
            setCategory(val);
            setPage(1);
          }}
          categories={allCategories}
        />

        <SortBar
          sort={sort}
          setSort={(val) => {
            setSort(val);
            setPage(1);
          }}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          products.map((item) => (
            <Card
              key={`${item.type}-${item._id}`}
              item={item}
              type={item.type}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}