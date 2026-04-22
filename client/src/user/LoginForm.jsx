import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function LoginForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Login Data:", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900">
        Sign In
      </h2>

      <p className="mt-2 text-slate-500">
        Access your bookings and profile dashboard.
      </p>

      {/* Email */}
      <div className="mt-8">
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
      <div className="mt-5">
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

      {/* Options */}
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
          />
          Remember me
        </label>

        <Link
          to="/login"
          className="text-slate-900 font-medium hover:text-yellow-500 transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full mt-8 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
      >
        Login Now
      </button>

      <p className="mt-6 text-center text-slate-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-slate-900 hover:text-yellow-500 transition"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;