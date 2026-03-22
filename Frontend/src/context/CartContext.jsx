// Cart Context

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");

  // fetch cart count
  const fetchCartCount = async () => {
    if (!token) return setCartCount(0);

    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const count = (res.data.data || []).reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);
    return () =>
      window.removeEventListener("cartUpdated", fetchCartCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart: fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
