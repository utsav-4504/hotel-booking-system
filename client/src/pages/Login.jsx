import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHotel
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login
    navigate("/profile");
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-slate-900 text-white p-12 relative">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-slate-900 flex items-center justify-center text-2xl mb-6">
                <FaHotel />
              </div>

              <p className="uppercase tracking-[0.3em] text-yellow-500 text-sm font-semibold">
                Welcome Back
              </p>

              <h1 className="text-5xl font-bold mt-4 leading-tight">
                Premium Stay Begins Here
              </h1>

              <p className="mt-6 text-slate-300 leading-8">
                Login to manage bookings, view reservations, and unlock luxury
                travel experiences worldwide.
              </p>
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950" />
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Account Access
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Sign In
            </h2>

            <p className="text-slate-500 mt-3">
              Enter your credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Extra */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link
                  to="/"
                  className="text-slate-900 font-medium hover:text-yellow-500 transition"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
              >
                Login Now
              </button>
            </form>

            {/* Bottom */}
            <p className="mt-6 text-slate-600 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-slate-900 hover:text-yellow-500 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;