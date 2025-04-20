import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <div className="text-3xl font-bold text-center text-white">Admin</div>

        {/* Navigation */}
        <div className="mt-10">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/inquiries"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Inquiries
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Logout</button>
          </div>
        </div>

        {/* Main Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {/* Total Reviews */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Reviews</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">1,240</p>
          </div>

          {/* Total Inquiries */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Inquiries</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">512</p>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">5</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
          <ul className="space-y-4 mt-4">
            <li className="flex justify-between text-gray-600">
              <span>John Doe posted a review</span>
              <span>2 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Jane Smith submitted an inquiry</span>
              <span>4 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Admin approved a review</span>
              <span>1 day ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
