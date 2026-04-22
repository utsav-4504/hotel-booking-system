import React, { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTicketAlt
} from "react-icons/fa";

function BookingForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    fullName: "",
    email: "",
    phone: "",
    coupon: ""
  });

  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 1;

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);

    const diff = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? diff : 1;
  }, [formData.checkIn, formData.checkOut]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "guests"
          ? Number(e.target.value)
          : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({
        ...formData,
        nights
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        Reservation Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Check In */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Check In
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Check Out
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Guests
          </label>

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
            </select>
          </div>
        </div>

        {/* Nights */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Nights
          </label>

          <input
            type="text"
            value={`${nights} Night(s)`}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Email
          </label>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Phone
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
              required
            />
          </div>
        </div>

        {/* Coupon */}
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700">
            Coupon Code
          </label>

          <div className="relative">
            <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              name="coupon"
              value={formData.coupon}
              onChange={handleChange}
              placeholder="LUX10"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
      >
        Continue Booking
      </button>
    </form>
  );
}

export default BookingForm;