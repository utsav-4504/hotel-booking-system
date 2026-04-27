import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaParking
} from "react-icons/fa";

function HotelCard({ hotel }) {
  const {
    id,
    name,
    city,
    image,
    rating,
    reviews,
    price,
    amenities = []
  } = hotel;

  return (
    <div
      data-gsap-card
      data-gsap-reveal
      className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100 hover:-translate-y-2 transition duration-300 will-change-transform"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-slate-900 text-sm font-semibold">
          Featured Stay
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {name}
            </h3>

            <p className="mt-2 flex items-center gap-2 text-slate-500">
              <FaMapMarkerAlt />
              {city}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-yellow-500 font-semibold">
              <FaStar />
              {rating}
            </span>

            <p className="text-xs text-slate-400 mt-1">
              {reviews}+ reviews
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-5 flex items-center gap-4 text-slate-500">
          {amenities.includes("Free WiFi") && <FaWifi />}
          {amenities.includes("Swimming Pool") && <FaSwimmingPool />}
          {amenities.includes("Parking") && <FaParking />}
        </div>

        {/* Price + CTA */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              ${price}
            </p>

            <span className="text-sm text-slate-500">
              per night
            </span>
          </div>

          <Link
            to={`/hotel/${id}`}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;