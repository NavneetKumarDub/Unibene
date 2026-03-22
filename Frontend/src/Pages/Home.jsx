import React from "react";
import { useNavigate } from "react-router-dom";
import Hero2 from "../assets/Hero2.png";
import { techData } from "../data/techData";
import { courseData } from "../data/courseData";
import { softwareData } from "../data/softwareData";

const Home = () => {
  const navigate = useNavigate();

  /* 🔢 REAL ANALYTICS */
  const allProducts = [...techData, ...courseData, ...softwareData];

  const totalProducts = allProducts.length;

  const totalBrands = new Set(
    allProducts.map((item) => item.brand).filter(Boolean)
  ).size;

  const totalCategories = new Set(
    allProducts.map((item) => item.category).filter(Boolean)
  ).size;

  const avgDiscount = Math.round(
    allProducts.reduce(
      (acc, item) => acc + (item.discountPercent || 0),
      0
    ) / allProducts.length
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            FIND EXCLUSIVE <br />
            OFFERS THAT <br />
            MATCH YOU
          </h1>

          <p className="mt-5 text-gray-600 max-w-md">
            Explore verified student discounts across technology, courses,
            and software — all in one place.
          </p>

          <button
            onClick={() => navigate("/all")}
            className="mt-8 px-10 py-3 rounded-full
                       bg-black text-white text-sm font-medium
                       hover:bg-gray-800 transition-all"
          >
            Shop Now
          </button>

          {/* 📊 STATS */}
          <div className="mt-12 flex flex-wrap gap-10">
            <StatCard value={totalProducts} label="Total Deals" />
            <StatCard value={totalBrands} label="Verified Brands" />
            <StatCard value={`${avgDiscount}%`} label="Avg. Student Savings" />
            <StatCard value={totalCategories} label="Categories" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          {/* subtle glow */}
          <div className="absolute -z-10 w-[420px] h-[420px] bg-indigo-200 rounded-full blur-3xl opacity-30" />

          <img
            src={Hero2}
            alt="Student shopping with discounts"
            className="max-h-[520px] w-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

/* 🔹 SMALL COMPONENT */
const StatCard = ({ value, label }) => (
  <div className="text-left">
    <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default Home;
