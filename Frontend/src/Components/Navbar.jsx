import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../context/CartContext";

const BRAND_KEYWORDS = [
  "dell",
  "hp",
  "apple",
  "samsung",
  "lenovo",
  "sony",
  "logitech",
  "asus",
];

const CATEGORY_KEYWORDS = [
  "laptop",
  "mobile",
  "tablet",
  "audio",
  "accessory",
  "smartwatch",
  "course",
  "technology",
  "software",
];

const Navbar = ({ variant = "full" }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  /* AUTH STATE */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  /* Check auth on route change */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setOpenMenu(false);
    navigate("/authenticate", { replace: true });
  };

  const handleCartClick = () => {
    navigate(isAuthenticated ? "/cart" : "/authenticate");
  };

  const triggerSearch = () => {
    const q = search.trim().toLowerCase();
    if (!q) return;
    navigate(`/search?q=${q}`);
    setSearch("");
    setShowSuggestions(false);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") triggerSearch();
  };

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = search.trim().toLowerCase();
    const timer = setTimeout(async () => {
      try {
        setLoadingSuggestions(true);
        const res = await fetch(
          `http://localhost:3000/api/search?q=${q}`
        );
        const data = await res.json();
        const backendResults = data.data || [];

        if (backendResults.length === 0 && q.length < 4) {
          const keywordMatches = [
            ...BRAND_KEYWORDS,
            ...CATEGORY_KEYWORDS,
          ]
            .filter((k) => k.startsWith(q))
            .slice(0, 6)
            .map((k) => ({
              _id: k,
              name: k,
              type: "keyword",
            }));

          setSuggestions(keywordMatches);
        } else {
          setSuggestions(backendResults.slice(0, 6));
        }

        setShowSuggestions(true);
      } catch (err) {
        console.error("Live search failed", err);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(false);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-3xl font-extrabold">
          UniBene
        </Link>

        {variant === "full" && (
          <div className="relative w-1/2">
            <div className="flex items-center h-12 px-5 rounded-full border">
              <input
                className="w-full bg-transparent focus:outline-none"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
              />
              <IoMdSearch size={20} onClick={triggerSearch} />
            </div>

            {showSuggestions && (
              <div className="absolute left-0 right-0 bg-white border mt-2 rounded-xl shadow-lg">
                {loadingSuggestions ? (
                  <p className="p-3 text-sm">Searching...</p>
                ) : (
                  suggestions.map((item) => (
                    <div
                      key={`${item.type}-${item._id}`}
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearch("");
                        navigate(`/search?q=${item.name}`);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {item.name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-5 items-center">
          <div onClick={handleCartClick} className="relative cursor-pointer">
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
               <span
                  className="absolute -top-2 -right-2 
                  bg-red-600 text-white 
                  text-xs font-semibold w-5 h-5 
                  flex items-center justify-center 
                  rounded-full"
              >
             {cartCount}
          </span>
        )}

          </div>

          {isAuthenticated ? (
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <CgProfile
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenMenu((prev) => !prev)}
              />

              {openMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg">
                  <button
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/authenticate")}
              className="px-4 py-2 border rounded-full hover:bg-black hover:text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {variant === "full" && (
        <ul className="flex justify-evenly mb-4">
          <NavItem to="/course" label="Course" location={location} />
          <NavItem to="/technology" label="Technology" location={location} />
          <NavItem to="/software" label="Software" location={location} />
          <NavItem to="/all" label="All" location={location} />
        </ul>
      )}
    </div>
  );
};

const NavItem = ({ to, label, location }) => {
  const isActive = location.pathname === to;

  return (
    <li
      className={`pb-1 border-b-2 ${
        isActive ? "border-black font-semibold" : "border-transparent"
      }`}
    >
      <Link to={to}>{label}</Link>
    </li>
  );
};

export default Navbar;
