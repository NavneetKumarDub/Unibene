// Search Page

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Components/Card";

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  // fetch search results
  const fetchSearchResults = async () => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
      );
      const json = await res.json();
      setResults(json.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSearchResults();
  }, [query]);

  if (loading)
    return <div className="p-10 text-center">Searching for “{query}”...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Search results for “{query}”
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
          results.map((item) => (
            <Card
              key={`${item.type}-${item._id}`}
              item={item}
              type={item.type}
            />
          ))
        )}
      </div>
    </div>
  );
}
