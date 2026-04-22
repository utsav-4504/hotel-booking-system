import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaStar,
  FaMapMarkerAlt
} from "react-icons/fa";

function HotelsManage() {
  const [search, setSearch] = useState("");

  const hotels = [
    {
      id: 1,
      name: "Ocean Pearl Resort",
      city: "Goa, India",
      rating: 4.9,
      price: 180,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500"
    },
    {
      id: 2,
      name: "Skyline Grand Hotel",
      city: "Dubai, UAE",
      rating: 4.8,
      price: 240,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500"
    },
    {
      id: 3,
      name: "Royal Palace Stay",
      city: "Udaipur, India",
      rating: 4.7,
      price: 150,
      status: "Inactive",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500"
    }
  ];

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Admin Panel
            </p>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
              Manage Hotels
            </h1>
          </div>

          <button className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
            <FaPlus />
            Add Hotel
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search hotel or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {hotel.name}
                    </h2>

                    <p className="mt-2 text-slate-500 flex items-center gap-2">
                      <FaMapMarkerAlt />
                      {hotel.city}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-yellow-500 font-semibold">
                    <FaStar />
                    {hotel.rating}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-2xl font-bold text-slate-900">
                    ${hotel.price}
                    <span className="text-sm text-slate-500 font-normal">
                      /night
                    </span>
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      hotel.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hotel.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition inline-flex items-center justify-center gap-2">
                    <FaEdit />
                    Edit
                  </button>

                  <button className="flex-1 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition inline-flex items-center justify-center gap-2">
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HotelsManage;    