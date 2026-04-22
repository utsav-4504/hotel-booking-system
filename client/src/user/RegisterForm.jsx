import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

function RegisterForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Register Data:", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900">
        Create Account
      </h2>

      <p className="mt-2 text-slate-500">
        Register to book premium stays worldwide.
      </p>

      {/* Full Name */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>

        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-5">
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

      {/* Phone */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Phone Number
        </label>

        <div className="relative">
          <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
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

      {/* Confirm Password */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Confirm Password
        </label>

        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Terms */}
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="mt-1"
          required
        />
        I agree to Terms & Conditions and Privacy Policy.
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full mt-8 py-3.5 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
      >
        Create Account
      </button>

      <p className="mt-6 text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-slate-900 hover:text-yellow-500 transition"
        >
          Login Now
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;