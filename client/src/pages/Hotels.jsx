import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking
} from "react-icons/fa";

function Hotels() {
  const allHotels = [
    {
      id: 1,
      name: "Ocean Pearl Resort",
      city: "Goa",
      price: 180,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      amenities: ["wifi", "pool", "parking"]
    },
    {
      id: 2,
      name: "Skyline Grand Hotel",
      city: "Dubai",
      price: 240,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
      amenities: ["wifi", "pool"]
    },
    {
      id: 3,
      name: "Royal Palace Stay",
      city: "Udaipur",
      price: 150,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      amenities: ["wifi", "parking"]
    },
    {
      id: 4,
      name: "Urban Luxe Suites",
      city: "Mumbai",
      price: 130,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
      amenities: ["wifi"]
    },
    {
      id: 5,
      name: "Mountain Crown Retreat",
      city: "Manali",
      price: 165,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200",
      amenities: ["wifi", "parking"]
    },
    {
      id: 6,
      name: "Sunset Marina Hotel",
      city: "Bali",
      price: 210,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
      amenities: ["wifi", "pool", "parking"]
    }
  ];

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);

  const filteredHotels = useMemo(() => {
    return allHotels.filter((hotel) => {
      const matchSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase());

      const matchPrice = hotel.price <= maxPrice;
      const matchRating = hotel.rating >= minRating;

      return matchSearch && matchPrice && matchRating;
    });
  }, [search, maxPrice, minRating]);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Hotel Collection
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Find Your Perfect Stay
          </h1>

          <p className="text-slate-600 mt-4 max-w-2xl">
            Browse luxury resorts, city hotels, villas and premium stays with
            trusted reviews and top-class amenities.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Search City / Hotel
                </label>

                <input
                  type="text"
                  placeholder="Goa, Dubai..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Max Price: ${maxPrice}
                </label>

                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Rating
                </label>

                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Hotels Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600">
                {filteredHotels.length} Hotels Found
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-7">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition duration-300"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {hotel.name}
                        </h3>

                        <p className="mt-2 text-slate-500 flex items-center gap-2">
                          <FaMapMarkerAlt />
                          {hotel.city}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <FaStar />
                        {hotel.rating}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex gap-4 text-slate-500 mt-5">
                      {hotel.amenities.includes("wifi") && <FaWifi />}
                      {hotel.amenities.includes("pool") && <FaSwimmingPool />}
                      {hotel.amenities.includes("parking") && <FaParking />}
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-2xl font-bold">
                        ${hotel.price}
                        <span className="text-sm text-slate-500 font-normal">
                          /night
                        </span>
                      </p>

                      <Link
                        to={`/hotel/${hotel.id}`}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredHotels.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
                <h3 className="text-2xl font-semibold text-slate-900">
                  No Hotels Found
                </h3>
                <p className="text-slate-500 mt-3">
                  Try changing your search or filter settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hotels;