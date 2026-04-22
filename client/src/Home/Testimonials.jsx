import React, { useState } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionTitle from "../common/SectionTitle";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Mehta",
      role: "Business Traveler",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      rating: 5,
      text:
        "The booking process was smooth and the hotel quality exceeded expectations. Premium experience from start to finish."
    },
    {
      id: 2,
      name: "Priya Shah",
      role: "Vacation Guest",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      rating: 5,
      text:
        "Beautiful resorts, transparent pricing and instant confirmations. This is now my favorite travel booking platform."
    },
    {
      id: 3,
      name: "Aman Verma",
      role: "Luxury Explorer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      rating: 5,
      text:
        "Excellent support team and premium stays in every city I visited. Highly recommended for frequent travelers."
    }
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const item = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Testimonials"
          title="What Our Guests Say"
          subtitle="Trusted by travelers worldwide for premium comfort, secure reservations and memorable stays."
          center
          light
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            {/* Quote */}
            <div className="w-14 h-14 rounded-2xl bg-yellow-500 text-slate-900 flex items-center justify-center text-xl">
              <FaQuoteLeft />
            </div>

            {/* Text */}
            <p className="mt-8 text-xl md:text-2xl leading-10 text-slate-200">
              {item.text}
            </p>

            {/* Rating */}
            <div className="mt-8 flex items-center gap-2 text-yellow-400">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* User */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
                />

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-slate-400">{item.role}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-white/15 hover:bg-white hover:text-slate-900 transition flex items-center justify-center"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 transition flex items-center justify-center"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-10 bg-yellow-500"
                    : "w-3 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;