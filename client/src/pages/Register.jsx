import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHotel
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setSuccessMsg("Registration successful");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });

      setTimeout(() => {
        navigate("/profile");
      }, 700);

    } catch (error) {
      setErrorMsg(error || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center bg-slate-900 text-white p-12 relative">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-slate-900 flex items-center justify-center text-2xl mb-6">
                <FaHotel />
              </div>

              <p className="uppercase tracking-[0.3em] text-yellow-500 text-sm font-semibold">
                Join StayLux
              </p>

              <h1 className="text-5xl font-bold mt-4 leading-tight">
                Create Your Premium Travel Account
              </h1>

              <p className="mt-6 text-slate-300 leading-8">
                Register now to book luxury stays,
                manage reservations, and receive
                exclusive hotel offers worldwide.
              </p>
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950" />
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              New Account
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Sign Up
            </h2>

            <p className="text-slate-500 mt-3">
              Fill your details to create account.
            </p>

            {/* ERROR */}
            {errorMsg && (
              <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}

            {/* SUCCESS */}
            {successMsg && (
              <div className="mt-5 bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* FULL NAME */}
              <div>
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

              {/* EMAIL */}
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

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* PASSWORD */}
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

              {/* CONFIRM PASSWORD */}
              <div>
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

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-slate-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-slate-900 hover:text-yellow-500 transition"
              >
                Login Now
              </Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Register;