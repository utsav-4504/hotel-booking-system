import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHotel,
  FaCalendarCheck,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />
    },
    {
      label: "Hotels",
      path: "/admin/hotels",
      icon: <FaHotel />
    },
    {
      label: "Bookings",
      path: "/admin/bookings",
      icon: <FaCalendarCheck />
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <FaUsers />
    }
  ];

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-yellow-500 text-slate-900"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white p-6 transform transition duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="text-3xl font-bold"
          >
            Stay<span className="text-yellow-500">Lux</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={navClass}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center"
          >
            <FaBars />
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Admin Panel
          </h1>

          <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0) || "A"}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
