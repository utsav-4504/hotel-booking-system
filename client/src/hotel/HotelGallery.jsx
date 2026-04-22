import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

function HotelGallery({ images = [] }) {
  const galleryImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400"
        ];

  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <img
          src={galleryImages[activeIndex]}
          alt="Hotel"
          className="w-full h-65 sm:h-95 lg:h-130 object-cover"
        />

        {/* Overlay Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 text-slate-900 hover:bg-white transition flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 text-slate-900 hover:bg-white transition flex items-center justify-center"
        >
          <FaChevronRight />
        </button>

        <button
          className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition flex items-center gap-2"
        >
          <FaExpand />
          View All
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-2xl overflow-hidden border-2 transition ${
              activeIndex === index
                ? "border-yellow-500"
                : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 sm:h-24 object-cover hover:scale-105 transition"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default HotelGallery;