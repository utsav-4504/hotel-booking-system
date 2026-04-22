import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaCheckCircle
} from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const bookingData = useMemo(
    () =>
      state || {
        room: {
          hotel: "Ocean Pearl Resort",
          roomName: "Deluxe Ocean View Room",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400"
        },
        checkIn: "2026-04-20",
        checkOut: "2026-04-22",
        guests: 2,
        nights: 2,
        subtotal: 360,
        taxes: 28.8,
        discount: 0,
        total: 388.8
      },
    [state]
  );

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      navigate("/my-bookings");
    }, 1800);
  };

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Secure Checkout
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Complete Your Payment
          </h1>

          <p className="text-slate-600 mt-4">
            Fast, secure and encrypted payment experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Payment Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <FaLock className="text-green-600" />
              <span className="text-slate-700 font-medium">
                256-bit SSL secured payment
              </span>
            </div>

            {/* Payment Methods */}
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Choose Payment Method
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-2xl border text-center transition ${
                  paymentMethod === "card"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-slate-200"
                }`}
              >
                <FaCreditCard className="mx-auto mb-2 text-xl" />
                Card
              </button>

              <button
                onClick={() => setPaymentMethod("bank")}
                className={`p-4 rounded-2xl border text-center transition ${
                  paymentMethod === "bank"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-slate-200"
                }`}
              >
                <FaUniversity className="mx-auto mb-2 text-xl" />
                Bank
              </button>

              <button
                onClick={() => setPaymentMethod("wallet")}
                className={`p-4 rounded-2xl border text-center transition ${
                  paymentMethod === "wallet"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-slate-200"
                }`}
              >
                <FaWallet className="mx-auto mb-2 text-xl" />
                Wallet
              </button>
            </div>

            {/* Card Form */}
            {paymentMethod === "card" && (
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Bank */}
            {paymentMethod === "bank" && (
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="text"
                  placeholder="IBAN / Account Number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            )}

            {/* Wallet */}
            {paymentMethod === "wallet" && (
              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Wallet Number / ID"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            )}

            {/* Billing */}
            <h3 className="text-xl font-semibold text-slate-900 mt-10 mb-5">
              Billing Address
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Country"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />

              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />

              <input
                type="text"
                placeholder="Postal Code"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />

              <input
                type="text"
                placeholder="Street Address"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <img
                src={bookingData.room.image}
                alt="Room"
                className="w-full h-52 object-cover rounded-2xl"
              />

              <h3 className="text-xl font-bold text-slate-900 mt-5">
                {bookingData.room.roomName}
              </h3>

              <p className="text-slate-500 mt-1">
                {bookingData.room.hotel}
              </p>

              <div className="mt-5 space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Check In</span>
                  <span>{bookingData.checkIn}</span>
                </div>

                <div className="flex justify-between">
                  <span>Check Out</span>
                  <span>{bookingData.checkOut}</span>
                </div>

                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{bookingData.guests}</span>
                </div>

                <div className="flex justify-between">
                  <span>Nights</span>
                  <span>{bookingData.nights}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${bookingData.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${bookingData.taxes.toFixed(2)}</span>
                </div>

                {bookingData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ${bookingData.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>${bookingData.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full mt-6 px-5 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                <FaCheckCircle />
                Secure payment gateway
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;