import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserFriends, FaBed, FaCalendarAlt } from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = {
    id,
    hotel: "Ocean Pearl Resort",
    roomName: "Deluxe Ocean View Room",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400",
    price: 180,
    beds: "1 King Bed",
    guests: 2
  };

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [coupon, setCoupon] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const subtotal = room.price * nights;
  const discount = coupon.toLowerCase() === "lux10" ? subtotal * 0.1 : 0;
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes - discount;

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        room,
        checkIn,
        checkOut,
        guests,
        nights,
        subtotal,
        taxes,
        discount,
        total
      }
    });
  };

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Reservation
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Complete Your Booking
          </h1>

          <p className="text-slate-600 mt-4">
            Secure your premium stay in just a few steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Booking Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Check In */}
              <div>
                <label className="block font-medium mb-2 text-slate-700">
                  Check In
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div>
                <label className="block font-medium mb-2 text-slate-700">
                  Check Out
                </label>

                <div className="relative">
                  <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />

                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block font-medium mb-2 text-slate-700">
                  Guests
                </label>

                <div className="relative">
                  <FaUserFriends className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />

                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Coupon */}
              <div>
                <label className="block font-medium mb-2 text-slate-700">
                  Coupon Code
                </label>

                <input
                  type="text"
                  placeholder="Enter code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Guest Info */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-5">
                Guest Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none md:col-span-2"
                />
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <img
                src={room.image}
                alt={room.roomName}
                className="w-full h-52 object-cover rounded-2xl"
              />

              <div className="mt-5">
                <p className="text-sm text-slate-500">{room.hotel}</p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {room.roomName}
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <FaBed />
                    {room.beds}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaUserFriends />
                    {room.guests} Guests
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5 space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>
                    ${room.price} × {nights} Night(s)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 px-5 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
              >
                Continue to Checkout
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Secure booking • Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;