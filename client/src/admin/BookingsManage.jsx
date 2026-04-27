import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
  FaTrash
} from "react-icons/fa";
import { deleteBooking, getAllBookings, updateBookingStatus } from "../services/bookingService";

function BookingsManage() {
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const loadBookings = async () => {
    const response = await getAllBookings({ limit: 100 });
    setBookings(response.bookings || []);
  };
  useEffect(() => {
    loadBookings();
  }, []);

  const filtered = useMemo(() => bookings.filter(
    (item) =>
      item.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.hotel?.name?.toLowerCase().includes(search.toLowerCase())
  ), [bookings, search]);

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
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Manage Bookings
          </h1>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search booking, guest or hotel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-left px-6 py-4">Booking ID</th>
                  <th className="text-left px-6 py-4">Guest</th>
                  <th className="text-left px-6 py-4">Hotel</th>
                  <th className="text-left px-6 py-4">Dates</th>
                  <th className="text-left px-6 py-4">Total</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {item.bookingNumber}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {item.user?.name}
                    </td>

                    <td className="px-6 py-5 text-slate-700">
                      {item.hotel?.name}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.checkInDate} - {item.checkOutDate}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-900">
                      ${item.totalAmount}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusUI[item.statusLabel]?.className || "bg-slate-100 text-slate-700"}`}
                      >
                        {statusUI[item.statusLabel]?.icon}
                        {item.statusLabel}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button
                          onClick={async () => {
                            const nextStatus = item.status === "pending" ? "confirmed" : "completed";
                            await updateBookingStatus(item.id, { status: nextStatus });
                            loadBookings();
                          }}
                          className="w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition flex items-center justify-center"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={async () => {
                            await deleteBooking(item.id);
                            loadBookings();
                          }}
                          className="w-10 h-10 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingsManage;