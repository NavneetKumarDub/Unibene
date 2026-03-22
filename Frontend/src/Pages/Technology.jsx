import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import SortBar from "../Components/SortBar";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";

export default function Technology() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);           
  const [totalPages, setTotalPages] = useState(1);  

  const techCategories = [
    
    { label: "Laptop", value: "laptop" },
    { label: "Mobile", value: "mobile" },
    { label: "Accessory", value: "accessory" },
    { label: "Tablet", value: "tablet" },
    { label: "Audio", value: "audio" },
    { label: "Smartwatch", value: "smartwatch" },
  ];

  useEffect(() => {
    fetchTechnology();
  }, [page, category, sort]);

  const fetchTechnology = async () => {
    try {
      const params = new URLSearchParams({
        page,
        category,
        sort,
      });

      const res = await fetch(
        `http://localhost:3000/api/deals/technology/page?${params.toString()}`
      );

      const json = await res.json();

      setProducts(json.data || []);
      setTotalPages(json.totalPages || 1); 
    } catch (error) {
      console.error("Failed to fetch technology", error);
      setProducts([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* FILTER + SORT */}
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterBar
          category={category}
          setCategory={(val) => {
            setCategory(val);
            setPage(1);
          }}
          categories={techCategories}
        />

        <SortBar
          sort={sort}
          setSort={(val) => {
            setSort(val);
            setPage(1); 
          }}
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No technology products found.</p>
        ) : (
          products.map((item) => (
            <Card key={item._id} item={item} type="technology" />
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