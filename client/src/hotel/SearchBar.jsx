import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaSearch
} from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4"
    >
      {/* Destination */}
      <div className="relative">
        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Where are you going?"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Check In */}
      <div className="relative">
        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Check Out */}
      <div className="relative">
        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Guests */}
      <div className="relative">
        <FaUserFriends className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
      >
        <FaSearch />
        Search
      </button>
    </form>
  );
}

export default SearchBar;