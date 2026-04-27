import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking
} from "react-icons/fa";
import { getHotels } from "../services/hotelService";

function Hotels() {
  const [searchParams] = useSearchParams();
  const [allHotels, setAllHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const destination = searchParams.get("destination") || "";
    if (destination) {
      setSearch(destination);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const response = await getHotels({ limit: 100 });
        setAllHotels(response.hotels || []);
      } catch (error) {
        setErrorMsg(error || "Failed to fetch hotels");
      } finally {
        setIsLoading(false);
      }
    };

    loadHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    return allHotels.filter((hotel) => {
      const matchSearch =
        hotel.name.toLowerCase().includes(search.toLowerCase()) ||
        hotel.city.toLowerCase().includes(search.toLowerCase());

      const matchPrice = Number(hotel.price || 0) <= maxPrice;
      const matchRating = hotel.rating >= minRating;

      return matchSearch && matchPrice && matchRating;
    });
  }, [allHotels, search, maxPrice, minRating]);

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10" data-gsap-reveal>
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
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24" data-gsap-reveal>
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
            {errorMsg && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-6">
                {errorMsg}
              </div>
            )}
            {isLoading && (
              <div className="bg-white rounded-2xl p-10 text-center shadow-lg">
                <p className="text-slate-700">Loading hotels...</p>
              </div>
            )}

            {!isLoading && (
              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-7">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  data-gsap-card
                  data-gsap-reveal
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition duration-300 will-change-transform"
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
                      {hotel.amenities.some((item) => item.toLowerCase().includes("wifi")) && <FaWifi />}
                      {hotel.amenities.some((item) => item.toLowerCase().includes("pool")) && <FaSwimmingPool />}
                      {hotel.amenities.some((item) => item.toLowerCase().includes("parking")) && <FaParking />}
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
            )}

            {/* Empty State */}
            {!isLoading && filteredHotels.length === 0 && (
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