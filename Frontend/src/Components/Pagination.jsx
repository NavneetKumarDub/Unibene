export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null; // ✅ unnecessary pagination hide

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      
      {/* PREV */}
      <button
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded-md text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {[...Array(totalPages)].map((_, index) => {
        const p = index + 1;
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded-md text-sm transition
              ${
                page === p
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded-md text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}