import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils
} from "react-icons/fa";

function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(btnRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const hotels = [
    {
      id: 1,
      name: "Ocean Pearl Resort",
      city: "Goa",
      price: "$180",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
    },
    {
      id: 2,
      name: "Skyline Grand Hotel",
      city: "Dubai",
      price: "$240",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900"
    },
    {
      id: 3,
      name: "Royal Palace Stay",
      city: "Udaipur",
      price: "$150",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900"
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600"
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-yellow-500 font-semibold tracking-[0.25em] uppercase mb-4">
              Luxury Hotel Booking
            </p>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              Discover Premium Stays Around The World
            </h1>

            <p
              ref={textRef}
              className="mt-6 text-lg text-slate-200 leading-8 max-w-2xl"
            >
              Book handpicked hotels, resorts and luxury villas with the best
              comfort, world-class hospitality and unforgettable experiences.
            </p>

            <div
              ref={btnRef}
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
                className="px-7 py-4 rounded-xl border border-white/30 text-white hover:bg-white hover:text-slate-900 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Box */}
      <section className="-mt-14 relative z-10 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Destination"
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <input
            type="date"
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <input
            type="date"
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <button className="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition">
            Search Now
          </button>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-yellow-500 font-semibold uppercase tracking-widest">
                Featured Hotels
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
                Popular Luxury Destinations
              </h2>
            </div>

            <Link
              to="/hotels"
              className="text-slate-900 font-semibold hover:text-yellow-500 transition"
            >
              View All Hotels →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>

                    <span className="flex items-center gap-1 text-yellow-500">
                      <FaStar /> 4.9
                    </span>
                  </div>

                  <p className="mt-3 text-slate-500 flex items-center gap-2">
                    <FaMapMarkerAlt /> {hotel.city}
                  </p>

                  <div className="mt-4 flex gap-4 text-slate-500">
                    <FaWifi />
                    <FaSwimmingPool />
                    <FaUtensils />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-2xl font-bold text-slate-900">
                      {hotel.price}
                      <span className="text-sm text-slate-500 font-normal">
                        /night
                      </span>
                    </p>

                    <Link
                      to={`/hotel/${hotel.id}`}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1200"
              alt="Luxury Room"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
              Experience Comfort Beyond Expectations
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              We partner with premium hotels and resorts to provide trusted
              stays, secure booking, transparent pricing and elite hospitality.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                ✔ Instant confirmation & secure payments
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                ✔ 24/7 guest support worldwide
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                ✔ Handpicked luxury rooms & resorts
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;