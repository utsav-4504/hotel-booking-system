import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaDumbbell
} from "react-icons/fa";
import { getHotelById } from "../services/hotelService";

function HotelDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const response = await getHotelById(id);
        setHotel(response.hotel);
      } catch (error) {
        setErrorMsg(error || "Failed to fetch hotel details");
      } finally {
        setIsLoading(false);
      }
    };

    loadHotel();
  }, [id]);

  const hotelImages = useMemo(() => {
    if (!hotel) return [];
    if (Array.isArray(hotel.gallery) && hotel.gallery.length) {
      return hotel.gallery.map((item) => item.imageUrl).filter(Boolean);
    }
    return hotel.image ? [hotel.image] : [];
  }, [hotel]);

  const amenityIcons = {
    "Free WiFi": <FaWifi />,
    "Swimming Pool": <FaSwimmingPool />,
    Parking: <FaParking />,
    Restaurant: <FaUtensils />,
    "Air Conditioning": <FaSnowflake />,
    "Fitness Center": <FaDumbbell />
  };

  if (isLoading) {
    return <div className="py-20 text-center">Loading hotel...</div>;
  }

  if (errorMsg || !hotel) {
    return <div className="py-20 text-center text-red-600">{errorMsg || "Hotel not found"}</div>;
  }

  return (
    <section className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            Luxury Stay
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            {hotel.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-slate-600">
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt />
              {hotel.city}, {hotel.country}
            </span>

            <span className="flex items-center gap-2 text-yellow-500 font-medium">
              <FaStar />
              {hotel.rating}
            </span>

            <span>{hotel.reviewsCount} Reviews</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <img
              src={hotelImages[selectedImage] || hotel.image}
              alt={hotel.name}
              className="w-full h-112.5 object-cover rounded-3xl shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {hotelImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-2xl border-2 ${
                  selectedImage === index
                    ? "border-yellow-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="Hotel"
                  className="w-full h-52 object-cover hover:scale-105 transition duration-300"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                About This Hotel
              </h2>

              <p className="text-slate-600 leading-8">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Amenities
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {hotel.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-yellow-500 text-lg">
                      {amenityIcons[item]}
                    </span>

                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Available Rooms
              </h2>

              <div className="space-y-5">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{room.name}</h3>

                      <p className="text-slate-500 mt-2">
                        {room.maxGuests} Guests • {room.beds}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <p className="text-2xl font-bold text-slate-900">
                        ${room.pricePerNight}
                        <span className="text-sm text-slate-500 font-normal">
                          /night
                        </span>
                      </p>

                      <Link
                        to={`/booking/${room.id}`}
                        state={{ room, hotel }}
                        className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Booking Card */}
          <div>
            <div className="bg-white rounded-3xl p-7 shadow-lg sticky top-24">
              <p className="text-slate-500 mb-2">Starting From</p>

              <h3 className="text-4xl font-bold text-slate-900">
                ${hotel.startingPrice}
                <span className="text-base font-normal text-slate-500">
                  /night
                </span>
              </h3>

              <div className="mt-6 space-y-4">
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full text-center px-5 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
              >
                Reserve Now
              </Link>

              <p className="text-sm text-slate-500 text-center mt-4">
                No hidden charges • Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotelDetails;