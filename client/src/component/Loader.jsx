import React from "react";
import { FaHotel } from "react-icons/fa";

function Loader() {
  return (
    <div className="fixed inset-0 z-999 bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-yellow-500 text-slate-900 flex items-center justify-center text-3xl animate-bounce">
          <FaHotel />
        </div>

        {/* Brand */}
        <h2 className="mt-6 text-3xl font-bold text-white tracking-wide">
          Stay<span className="text-yellow-500">Lux</span>
        </h2>

        {/* Text */}
        <p className="mt-3 text-slate-400">
          Loading premium experience...
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mt-6 mx-auto">
          <div className="h-full w-1/2 bg-yellow-500 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Loader;