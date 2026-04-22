import React, { useState } from "react";
import {
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaChevronDown
} from "react-icons/fa";

function FilterSidebar({ onFilter }) {
  const [filters, setFilters] = useState({
    maxPrice: 300,
    rating: 0,
    wifi: false,
    pool: false,
    parking: false
  });

  const handleChange = (key, value) => {
    const updated = {
      ...filters,
      [key]: value
    };

    setFilters(updated);

    if (onFilter) {
      onFilter(updated);
    }
  };

  return (
    <aside className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Filters
        </h3>

        <button
          onClick={() =>
            handleChange("maxPrice", 300) ||
            handleChange("rating", 0)
          }
          className="text-sm text-yellow-600 font-medium hover:text-yellow-500"
        >
          Reset
        </button>
      </div>

      {/* Price */}
      <div className="pb-6 border-b border-slate-100">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Max Price: ${filters.maxPrice}
        </label>

        <input
          type="range"
          min="50"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={(e) =>
            handleChange("maxPrice", Number(e.target.value))
          }
          className="w-full accent-yellow-500"
        />
      </div>

      {/* Rating */}
      <div className="py-6 border-b border-slate-100">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Minimum Rating
        </label>

        <div className="space-y-3">
          {[4, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => handleChange("rating", rate)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition ${
                filters.rating === rate
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                {rate}+ Stars
              </span>

              <FaChevronDown className="text-xs opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="pt-6">
        <label className="block text-sm font-semibold text-slate-700 mb-4">
          Amenities
        </label>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-3 text-slate-700">
              <FaWifi className="text-slate-500" />
              Free WiFi
            </span>

            <input
              type="checkbox"
              checked={filters.wifi}
              onChange={(e) =>
                handleChange("wifi", e.target.checked)
              }
              className="accent-yellow-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-3 text-slate-700">
              <FaSwimmingPool className="text-slate-500" />
              Pool
            </span>

            <input
              type="checkbox"
              checked={filters.pool}
              onChange={(e) =>
                handleChange("pool", e.target.checked)
              }
              className="accent-yellow-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex items-center gap-3 text-slate-700">
              <FaParking className="text-slate-500" />
              Parking
            </span>

            <input
              type="checkbox"
              checked={filters.parking}
              onChange={(e) =>
                handleChange("parking", e.target.checked)
              }
              className="accent-yellow-500"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;