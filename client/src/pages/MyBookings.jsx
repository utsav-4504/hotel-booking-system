import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

function MyBookings() {
  const bookings = [
    {
      id: "BK1024",
      hotel: "Ocean Pearl Resort",
      city: "Goa, India",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      room: "Deluxe Ocean View Room",
      checkIn: "20 Apr 2026",
      checkOut: "22 Apr 2026",
      guests: 2,
      total: 388.8,
      status: "Confirmed"
    },
    {
      id: "BK1057",
      hotel: "Skyline Grand Hotel",
      city: "Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
      room: "Executive Suite",
      checkIn: "05 May 2026",
      checkOut: "08 May 2026",
      guests: 3,
      total: 740,
      status: "Pending"
    },
    {
      id: "BK0991",
      hotel: "Royal Palace Stay",
      city: "Udaipur, India",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      room: "Royal King Room",
      checkIn: "12 Mar 2026",
      checkOut: "14 Mar 2026",
      guests: 2,
      total: 310,
      status: "Cancelled"
    }
  ];

  const statusUI = {
    Confirmed: {
      icon: <FaCheckCircle />,
      className: "bg-green-100 text-green-700"
    },
    Pending: {
      icon: <FaClock />,
      className: "bg-yellow-100 text-yellow-700"
    },
    Cancelled: {
      icon: <FaTimesCircle />,
      className: "bg-red-100 text-red-700"
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Reservations
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            My Bookings
          </h1>

          <p className="text-slate-600 mt-4">
            Track upcoming stays, completed trips and reservation history.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="grid lg:grid-cols-4">
                {/* Image */}
                <div className="lg:col-span-1">
                  <img
                    src={booking.image}
                    alt={booking.hotel}
                    className="w-full h-full min-h-65 object-cover"
                  />
                </div>

                {/* Details */}
                <div className="lg:col-span-3 p-8">
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {booking.hotel}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            statusUI[booking.status].className
                          }`}
                        >
                          {statusUI[booking.status].icon}
                          {booking.status}
                        </span>
                      </div>

                      <p className="mt-3 text-slate-500 flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {booking.city}
                      </p>

                      <p className="mt-3 text-slate-700 font-medium">
                        {booking.room}
                      </p>
                    </div>

                    <div className="text-left xl:text-right">
                      <p className="text-sm text-slate-500">Booking ID</p>

                      <p className="text-lg font-bold text-slate-900">
                        {booking.id}
                      </p>

                      <p className="mt-3 text-3xl font-bold text-slate-900">
                        ${booking.total}
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="grid md:grid-cols-3 gap-5 mt-8">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-500 mb-2">Check In</p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaCalendarAlt />
                        {booking.checkIn}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-500 mb-2">Check Out</p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaCalendarAlt />
                        {booking.checkOut}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-500 mb-2">Guests</p>

                      <p className="font-semibold flex items-center gap-2">
                        <FaUserFriends />
                        {booking.guests} Guests
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      to="/profile"
                      className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      View Details
                    </Link>

                    {booking.status === "Confirmed" && (
                      <button className="px-5 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition">
                        Cancel Booking
                      </button>
                    )}

                    <button className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/hotels"
            className="inline-flex px-7 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
          >
            Book Another Stay
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MyBookings;