import { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || { orderedItems: [] };
      setCartCount(cart.orderedItems.length);
    };

    updateCartCount();

    // Auto-refresh count if user is adding/removing items
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full h-[70px] shadow-xl flex justify-between items-center px-4 bg-accent text-white relative">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        className="w-[60px] h-[60px] object-cover border-[3px] border-white rounded-full"
      />

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6 text-[18px] items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/gallery" className="hover:underline">Gallery</Link>
        <Link to="/items" className="hover:underline">Items</Link>
      </div>

      {/* Auth + Cart */}
      <div className="hidden md:flex space-x-3 items-center">
        {!token ? (
          <>
            <Link
              to="/login"
              className="border px-4 py-1 rounded hover:bg-white hover:text-black flex items-center gap-2"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-2"
            >
              <FaUserPlus /> Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}

        {/* Cart */}
        <Link
          to="/booking"
          className="border px-4 py-1 rounded hover:bg-white hover:text-black flex items-center gap-2"
        >
          <FaShoppingCart /> Cart ({cartCount})
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <GiHamburgerMenu
        className="md:hidden text-[28px]"
        onClick={() => setNavPanelOpen(true)}
      />

      {/* Mobile Navigation Panel */}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
    </header>
  );
}
