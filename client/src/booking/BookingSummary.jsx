import React from "react";
import {
  FaBed,
  FaCalendarAlt,
  FaUserFriends,
  FaCheckCircle
} from "react-icons/fa";

function BookingSummary({
  booking = {
    hotel: "Ocean Pearl Resort",
    room: "Deluxe Ocean View Room",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400",
    checkIn: "20 Apr 2026",
    checkOut: "22 Apr 2026",
    guests: 2,
    nights: 2,
    price: 180,
    taxes: 28.8,
    discount: 0
  }
}) {
  const subtotal = booking.price * booking.nights;
  const total = subtotal + booking.taxes - booking.discount;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
      {/* Image */}
      <img
        src={booking.image}
        alt={booking.room}
        className="w-full h-52 object-cover rounded-2xl"
      />

      {/* Hotel Info */}
      <div className="mt-5">
        <p className="text-sm text-slate-500">{booking.hotel}</p>

        <h3 className="text-xl font-bold text-slate-900 mt-1">
          {booking.room}
        </h3>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <FaBed />
            Premium Room
          </span>

          <span className="flex items-center gap-2">
            <FaUserFriends />
            {booking.guests} Guests
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-slate-600">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            Check In
          </span>

          <span>{booking.checkIn}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            Check Out
          </span>

          <span>{booking.checkOut}</span>
        </div>

        <div className="flex justify-between">
          <span>Nights</span>
          <span>{booking.nights}</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-slate-600">
        <div className="flex justify-between">
          <span>
            ${booking.price} × {booking.nights} Night(s)
          </span>

          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>

          <span>${booking.taxes.toFixed(2)}</span>
        </div>

        {booking.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>

            <span>- ${booking.discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Secure */}
      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-green-600">
        <FaCheckCircle />
        Secure Booking Guaranteed
      </div>
    </div>
  );
}

export default BookingSummary;