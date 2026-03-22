export default function SortBar({ sort, setSort, setPage }) {
  const options = [
    { value: "", label: "Sort By" },
    { value: "discountHigh", label: "Discount (High → Low)" },
    { value: "priceLow", label: "Price (Low → High)" },
    { value: "priceHigh", label: "Price (High → Low)" },
  ];

  return (
    <div className="relative w-56 group">
      {/* BUTTON */}
      <button
        className="
          w-full flex justify-between items-center
          px-4 py-2 rounded-lg
          border border-gray-300 bg-white
          font-medium text-gray-700
          hover:border-black transition
        "
      >
        {options.find(o => o.value === sort)?.label || "Sort By"}
        <span className="text-sm">▾</span>
      </button>

      {/* DROPDOWN */}
      <div
        className="
          absolute top-full left-0 mt-2 w-full
          bg-white rounded-xl shadow-lg
          border border-gray-200
          z-50 overflow-hidden
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
        "
      >
        {options.map(opt => (
          <div
            key={opt.value}
            onClick={() => {
              setSort(opt.value);
              setPage(1);
            }}
            className="
              px-4 py-2 text-sm cursor-pointer
              text-gray-700
              hover:bg-black hover:text-white
              transition
            "
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
