import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log("Token value:", token); // Debugging
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <header className="w-full h-[70px] shadow-lg flex justify-between items-center px-6 bg-accent text-white relative">
      {/* Logo */}
      <Link to="/">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[60px] h-[60px] object-cover border-4 border-white rounded-full"
        />
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        <Link to="/gallery" className="hover:text-gray-300 transition">Gallery</Link>
        <Link to="/items" className="hover:text-gray-300 transition">Items</Link>
      </nav>

      {/* Cart & Logout */}
      <div className="flex items-center space-x-6">
        <Link to="/booking" className="text-3xl hover:text-gray-300 transition">
          <FaCartShopping />
        </Link>
        {token && (
          <button
            className="flex items-center px-6 py-3 bg-red-600 rounded-lg text-white text-xl font-semibold hover:bg-red-700 transition space-x-3 shadow-lg"
            onClick={handleLogout}
          >
            <FiLogOut className="text-3xl" />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <GiHamburgerMenu
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setNavPanelOpen(true)}
      />

      {/* Mobile Navigation Panel */}
      {navPanelOpen && <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />}
    </header>
  );
}
