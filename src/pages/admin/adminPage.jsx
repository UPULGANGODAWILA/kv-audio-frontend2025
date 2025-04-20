import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemspage from "./adminItemsPage.jsx";
import AddItemPage from "./addItemPage.jsx";
import UpdateItemPage from "./updateItemPage.jsx";
import AdminUsersPage from "../../pages/admin/adminUsersPage.jsx";
import AdminBookingPage from "./adminBookingPage.jsx";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-[240px] h-full bg-green-600 text-white shadow-lg p-5 flex flex-col space-y-6">
        {/* Dashboard Link */}
        <Link to="/admin/dashboard" className="flex items-center text-lg font-semibold hover:bg-green-500 px-4 py-2 rounded-md transition duration-200">
          <BsGraphDown size={22} />
          <span className="ml-3">Dashboard</span>
        </Link>
        
        {/* Bookings Link */}
        <Link to="/admin/bookings" className="flex items-center text-lg font-semibold hover:bg-green-500 px-4 py-2 rounded-md transition duration-200">
          <FaRegBookmark size={22} />
          <span className="ml-3">Bookings</span>
        </Link>
        
        {/* Items Link */}
        <Link to="/admin/items" className="flex items-center text-lg font-semibold hover:bg-green-500 px-4 py-2 rounded-md transition duration-200">
          <MdOutlineSpeaker size={22} />
          <span className="ml-3">Items</span>
        </Link>

        {/* Users Link */}
        <Link to="/admin/users" className="flex items-center text-lg font-semibold hover:bg-green-500 px-4 py-2 rounded-md transition duration-200">
          <FaRegUser size={22} />
          <span className="ml-3">Users</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <Routes>
          <Route path="/bookings" element={<AdminBookingPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/items" element={<AdminItemspage />} />
          <Route path="/items/add" element={<AddItemPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
        
        </Routes>
      </div>
    </div>
  );
}
