import { useState } from "react";

export default function FilterBar({ category, setCategory, categories }) {
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
        {category
          ? categories.find(c => c.value === category)?.label
          : "All Categories"}
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
        <DropdownItem
          label="All Categories"
          onClick={() => setCategory("")}
        />

        {categories.map(cat => (
          <DropdownItem
            key={cat.value}
            label={cat.label}
            onClick={() => setCategory(cat.value)}
          />
        ))}
      </div>
    </div>
  );
}

const DropdownItem = ({ label, onClick }) => (
  <div
    onClick={onClick}
    className="
      px-4 py-2 text-sm cursor-pointer
      text-gray-700
      hover:bg-black hover:text-white
      transition
    "
  >
    {label}
  </div>
);
