import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import SearchBar from "../hotel/SearchBar";

function HeroSection() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      });

      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out"
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });

      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (data) => {
    console.log("Search Data:", data);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1800"
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/80 to-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <p
            ref={badgeRef}
            className="inline-flex px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold tracking-[0.25em] uppercase"
          >
            Premium Hotel Booking
          </p>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Discover Luxury Stays Across The World
          </h1>

          {/* Text */}
          <p
            ref={textRef}
            className="mt-6 text-lg md:text-xl text-slate-300 leading-8 max-w-2xl"
          >
            Book curated hotels, beachfront resorts and elite city stays with
            premium comfort, trusted reviews and unforgettable experiences.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/hotels"
              className="px-7 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
            >
              Explore Hotels
            </Link>

            <Link
              to="/register"
              className="px-7 py-4 rounded-xl border border-white/20 text-white hover:bg-white hover:text-slate-900 transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Search Box */}
        <div className="mt-14">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;