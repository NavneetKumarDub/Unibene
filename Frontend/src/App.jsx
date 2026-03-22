// App Router

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

/* Layout */
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

/* Public */
import Home from "./Pages/Home";
import Technology from "./Pages/Technology";
import Software from "./Pages/Software";
import Course from "./Pages/Course";
import All from "./Pages/All";
import Search from "./Pages/Search";
import Authenticate from "./Pages/Authenticate";
import MyProfile from "./Pages/MyProfile";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";

/* Admin */
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminAddProduct from "./admin/pages/AdminAddProduct";
import AdminCarts from "./admin/pages/AdminCarts";

// Handles layout logic
function AppContent() {
  const location = useLocation();

  const compactRoutes = ["/cart", "/profile"];
  const isAdmin = location.pathname.startsWith("/admin");
  const isCompact = compactRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (non-admin) */}
      {!isAdmin && <Navbar variant={isCompact ? "compact" : "full"} />}

      <main className="flex-grow">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/software" element={<Software />} />
          <Route path="/course" element={<Course />} />
          <Route path="/all" element={<All />} />
          <Route path="/search" element={<Search />} />

          {/* Product detail */}
          <Route path="/:type/:id" element={<ProductDetail />} />

          {/* Auth & user */}
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="carts" element={<AdminCarts />} />
          </Route>
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

// App root
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
