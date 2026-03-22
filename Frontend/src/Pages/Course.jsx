import { useEffect, useState } from "react";
import FilterBar from "../Components/FilterBar";
import SortBar from "../Components/SortBar";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const courseCategories = [
  
    { label: "Programming", value: "programming" },
    { label: "Web Development", value: "web_development" },
    { label: "Data Science", value: "data_science" },
    { label: "AI / ML", value: "ai_ml" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "Cloud Computing", value: "cloud_computing" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Business", value: "business" },
  ];

  useEffect(() => {
    fetchCourses();
  }, [page, category, sort]);

  const fetchCourses = async () => {
    try {
      const params = new URLSearchParams({
        page,
        category,
        sort,
      });

      const res = await fetch(
        `http://localhost:3000/api/deals/course/page?${params.toString()}`
      );

      const json = await res.json();

      setCourses(json.data || []);
      setTotalPages(json.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setCourses([]);
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
          categories={courseCategories}
        />

        <SortBar
          sort={sort}
          setSort={(val) => {
            setSort(val);
            setPage(1);
          }}
        />
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          courses.map((item) => (
            <Card key={item._id} item={item} type="course" />
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