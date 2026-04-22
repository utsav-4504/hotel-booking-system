import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaSearch } from "react-icons/fa";

function NotFound() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-yellow-500 text-4xl">
          <FaExclamationTriangle />
        </div>

        {/* Code */}
        <p className="mt-8 text-yellow-500 uppercase tracking-[0.35em] text-sm font-semibold">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl md:text-7xl font-bold leading-tight">
          Page Not Found
        </h1>

        <p className="mt-6 text-slate-300 text-lg leading-8 max-w-2xl mx-auto">
          The page you’re looking for may have been moved, deleted, or never
          existed. Let’s get you back to your luxury travel experience.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-slate-900 transition"
          >
            <FaSearch />
            Browse Hotels
          </Link>
        </div>

        {/* Extra Text */}
        <p className="mt-10 text-sm text-slate-500">
          Need help? Contact support anytime.
        </p>
      </div>
    </section>
  );
}

export default NotFound;