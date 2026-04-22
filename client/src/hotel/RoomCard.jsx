import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaUsers, FaWifi, FaCheck } from "react-icons/fa";

function RoomCard({ room, hotelId }) {
  const {
    id,
    name,
    image = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
    beds = "1 King Bed",
    guests = 2,
    price = 0,
    amenities = [],
    description = "Comfortable and well-appointed room with modern amenities"
  } = room;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:-translate-y-1 transition duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        
        <div className="absolute top-3 right-3 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
          ${price}/night
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4">
          {description}
        </p>

        {/* Room Details */}
        <div className="flex gap-4 mb-4 text-slate-600">
          <div className="flex items-center gap-1">
            <FaBed className="text-yellow-500" />
            <span className="text-sm">{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-yellow-500" />
            <span className="text-sm">Up to {guests} guests</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-700 text-xs rounded-full"
              >
                <FaCheck className="text-green-500 text-xs" />
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/booking/${id}`}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-medium text-center hover:bg-slate-800 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
