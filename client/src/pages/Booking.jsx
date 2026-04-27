import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUserFriends, FaBed, FaCalendarAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { createBooking } from "../services/bookingService";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const room = {
    id,
    hotel: state?.hotel?.name || "Selected Hotel",
    roomName: state?.room?.name || "Selected Room",
    image: state?.room?.imageUrl || state?.hotel?.image || "",
    price: Number(state?.room?.pricePerNight || 0),
    beds: state?.room?.beds || "-",
    guests: Number(state?.room?.maxGuests || 1),
    hotelId: state?.hotel?.id || null
  };

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
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

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!room.hotelId || !checkIn || !checkOut) {
      setErrorMsg("Please select check-in/check-out dates.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg("");
      const response = await createBooking({
        hotelId: room.hotelId,
        roomId: room.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: guests,
        couponCode: coupon
      });

      navigate("/checkout", {
        state: {
          booking: response.booking,
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
    } catch (error) {
      setErrorMsg(error || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state?.room || !state?.hotel) {
    return (
      <section className="py-16 text-center">
        <p className="text-slate-700">
          Room context missing. Please select a room from hotel details.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {errorMsg && (
          <div className="mb-6 bg-red-100 text-red-700 px-4 py-3 rounded-xl">
            {errorMsg}
          </div>
        )}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Booking Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2 text-slate-700">Check In</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2 text-slate-700">Check Out</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2 text-slate-700">Guests</label>
                <div className="relative">
                  <FaUserFriends className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none">
                    {[...Array(room.guests)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>{index + 1} Guest</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2 text-slate-700">Coupon Code</label>
                <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <img src={room.image} alt={room.roomName} className="w-full h-52 object-cover rounded-2xl" />
              <div className="mt-5">
                <p className="text-sm text-slate-500">{room.hotel}</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{room.roomName}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2"><FaBed />{room.beds}</span>
                  <span className="flex items-center gap-2"><FaUserFriends />{room.guests} Guests</span>
                </div>
              </div>
              <div className="mt-6 border-t border-slate-200 pt-5 space-y-3 text-slate-600">
                <div className="flex justify-between"><span>${room.price} × {nights} Night(s)</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Taxes & Fees</span><span>${taxes.toFixed(2)}</span></div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold text-slate-900"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <button onClick={handleCheckout} disabled={isSubmitting} className="w-full mt-6 px-5 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition disabled:opacity-70">
                {isSubmitting ? "Creating booking..." : "Continue to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;