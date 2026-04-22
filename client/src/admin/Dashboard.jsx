import React from "react";
import {
  FaHotel,
  FaUsers,
  FaCalendarCheck,
  FaDollarSign,
  FaArrowUp,
  FaStar
} from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Total Hotels",
      value: "128",
      icon: <FaHotel />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Users",
      value: "8,540",
      icon: <FaUsers />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Bookings",
      value: "1,274",
      icon: <FaCalendarCheck />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Revenue",
      value: "$48,920",
      icon: <FaDollarSign />,
      color: "bg-yellow-100 text-yellow-700"
    }
  ];

  const recentBookings = [
    {
      id: "#BK1204",
      user: "Rahul Shah",
      hotel: "Ocean Pearl Resort",
      amount: "$388",
      status: "Confirmed"
    },
    {
      id: "#BK1205",
      user: "Priya Patel",
      hotel: "Skyline Grand Hotel",
      amount: "$620",
      status: "Pending"
    },
    {
      id: "#BK1206",
      user: "Aman Verma",
      hotel: "Royal Palace Stay",
      amount: "$210",
      status: "Cancelled"
    }
  ];

  const topHotels = [
    { name: "Ocean Pearl Resort", rating: 4.9 },
    { name: "Skyline Grand Hotel", rating: 4.8 },
    { name: "Royal Palace Stay", rating: 4.7 }
  ];

  const statusColor = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700"
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
            Dashboard Overview
          </h1>

          <p className="text-slate-600 mt-4">
            Manage bookings, hotels, customers and platform growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">{item.title}</p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-3">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-green-600 text-sm font-medium">
                <FaArrowUp />
                +12.5% this month
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Bookings
              </h2>

              <button className="text-slate-900 font-medium hover:text-yellow-500 transition">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-175">
                <thead>
                  <tr className="text-left border-b border-slate-200">
                    <th className="pb-4 font-semibold">Booking ID</th>
                    <th className="pb-4 font-semibold">User</th>
                    <th className="pb-4 font-semibold">Hotel</th>
                    <th className="pb-4 font-semibold">Amount</th>
                    <th className="pb-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100"
                    >
                      <td className="py-4 font-medium text-slate-900">
                        {item.id}
                      </td>

                      <td className="py-4 text-slate-600">
                        {item.user}
                      </td>

                      <td className="py-4 text-slate-600">
                        {item.hotel}
                      </td>

                      <td className="py-4 font-semibold text-slate-900">
                        {item.amount}
                      </td>

                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Hotels */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Top Rated Hotels
            </h2>

            <div className="space-y-5">
              {topHotels.map((hotel, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <h3 className="font-semibold text-slate-900">
                    {hotel.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-yellow-500">
                    <FaStar />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition">
                  Add New Hotel
                </button>

                <button className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                  Manage Users
                </button>

                <button className="w-full py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
                  Revenue Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;