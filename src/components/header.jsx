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
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setCartCount(0);
    window.location.href = "/login";
  };

  return (
    <header className="w-full h-[70px] shadow-xl flex justify-between items-center px-4 bg-accent text-white fixed top-0 left-0 z-50">
      {/* Logo */}
      <img
        src="/NewLogo.png"
        alt="logo"
        className="w-[60px] h-[60px] object-cover border-[3px] border-white rounded-full"
      />

      {/* Logo Text */}
      <div className="hidden md:flex items-center">
        <h1 className="text-xl font-extrabold font-serif text-white text-left">
          KV Audio Enterprises
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 text-[20px] items-center">
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
            onClick={handleLogout}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}

        <Link
          to="/booking"
          className="border px-4 py-1 rounded hover:bg-white hover:text-black flex items-center gap-2"
        >
          <FaShoppingCart /> Cart ({cartCount})
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <GiHamburgerMenu
        className="md:hidden text-[28px]"
        onClick={() => setNavPanelOpen(true)}
      />

      {/* Mobile Navigation Panel */}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
    </header>
  );
}
