import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import SortBar from "../Components/SortBar";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";

export default function Software() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const softwareCategories = [
    { label: "Software Tools", value: "software" },
    { label: "Subscriptions", value: "subscription" },
  ];

  useEffect(() => {
    fetchSoftware();
  }, [page, category, sort]);

  const fetchSoftware = async () => {
    try {
      const params = new URLSearchParams({
        page,
        category,
        sort,
      });

      const res = await fetch(
        `http://localhost:3000/api/deals/software/page?${params.toString()}`
      );
      const json = await res.json();

      setItems(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch software data", error);
      setItems([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterBar
          category={category}
          setCategory={(val) => {
            setCategory(val);
            setPage(1);
          }}
          categories={softwareCategories}
        />

        <SortBar
          sort={sort}
          setSort={(val) => {
            setSort(val);
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length === 0 ? (
          <p className="text-gray-500">No software available.</p>
        ) : (
          items.map((item) => (
            <Card key={item._id} item={item} type="software" />
          ))
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </div>
  );
}