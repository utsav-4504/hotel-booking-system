import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import HotelCard from "../hotel/HotelCard";
import hotels from "../../data/hotels";

function FeaturedHotels() {
  const featuredHotels = hotels.filter((hotel) => hotel.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionTitle
            tag="Featured Hotels"
            title="Handpicked Premium Stays"
            subtitle="Luxury resorts, iconic city hotels and unforgettable destinations selected for premium comfort."
          />

          <Link
            to="/hotels"
            className="text-slate-900 font-semibold hover:text-yellow-500 transition"
          >
            View All Hotels →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedHotels;