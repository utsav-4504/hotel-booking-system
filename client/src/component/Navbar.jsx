import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-yellow-500 font-semibold"
      : "text-slate-700 hover:text-slate-900 transition";

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
            Stay<span className="text-yellow-500">Lux</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/hotels" className={navClass}>
              Hotels
            </NavLink>

            <NavLink to="/my-bookings" className={navClass}>
              Bookings
            </NavLink>

            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
                >
                  <FaUserCircle className="text-2xl text-slate-900" />
                  <span className="font-medium text-slate-900 text-sm">{user.name.split(" ")[0]}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 hover:bg-slate-50 text-slate-700 text-sm"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 hover:bg-slate-50 text-slate-700 text-sm"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 text-red-600 text-sm flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-900 text-3xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-5">
          <nav className="flex flex-col gap-4 pt-4">
            <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink
              to="/hotels"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Hotels
            </NavLink>

            <NavLink
              to="/my-bookings"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Bookings
            </NavLink>

            <NavLink
              to="/profile"
              className={navClass}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </NavLink>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl text-left text-red-600 flex items-center gap-2 font-medium"
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-slate-900 text-white text-center"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;