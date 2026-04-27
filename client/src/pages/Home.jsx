import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaQuoteLeft
} from "react-icons/fa";
import { getFeaturedHotels } from "../services/hotelService";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryCardsRef = useRef([]);
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const customerReviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      location: "Mumbai, India",
      rating: 5,
      comment:
        "Booking was smooth and the hotel quality was exactly as shown. Customer support was fast and very helpful."
    },
    {
      id: 2,
      name: "Priya Mehta",
      location: "Jaipur, India",
      rating: 5,
      comment:
        "Loved the curated hotel options. The stay was clean, premium and the price was transparent with no surprises."
    },
    {
      id: 3,
      name: "Aarav Kapoor",
      location: "Chennai, India",
      rating: 4,
      comment:
        "Great platform for family trips. Confirmations were instant and managing booking details was very easy."
    }
  ];
  const galleryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400"
  ];

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

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination.trim()) {
      params.set("destination", destination.trim());
    }
    if (checkInDate) {
      params.set("checkIn", checkInDate);
    }
    if (checkOutDate) {
      params.set("checkOut", checkOutDate);
    }

    const queryString = params.toString();
    navigate(queryString ? `/hotels?${queryString}` : "/hotels");
  };

  useEffect(() => {
    const loadFeaturedHotels = async () => {
      try {
        const response = await getFeaturedHotels();
        setHotels(response.hotels || []);
      } catch (error) {
        setHotels([]);
      }
    };

    loadFeaturedHotels();
  }, []);

  useEffect(() => {
    const section = gallerySectionRef.current;

    if (!section || !galleryCardsRef.current.length) {
      return;
    }

    const cards = galleryCardsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-title",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        }
      );

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 80, scale: 0.92, rotateX: 12 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );

      cards.forEach((card) => {
        const image = card.querySelector("img");

        if (!image) {
          return;
        }

        const onMouseMove = (event) => {
          const bounds = card.getBoundingClientRect();
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top;
          const rotateY = gsap.utils.mapRange(0, bounds.width, -8, 8, x);
          const rotateX = gsap.utils.mapRange(0, bounds.height, 8, -8, y);

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.35,
            ease: "power2.out"
          });

          gsap.to(image, {
            scale: 1.08,
            x: gsap.utils.mapRange(0, bounds.width, -8, 8, x),
            y: gsap.utils.mapRange(0, bounds.height, -8, 8, y),
            duration: 0.45,
            ease: "power2.out"
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power3.out"
          });
          gsap.to(image, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);

        card._onMouseMove = onMouseMove;
        card._onMouseLeave = onMouseLeave;
      });
    }, section);

    return () => {
      cards.forEach((card) => {
        if (card?._onMouseMove) {
          card.removeEventListener("mousemove", card._onMouseMove);
        }
        if (card?._onMouseLeave) {
          card.removeEventListener("mouseleave", card._onMouseLeave);
        }
      });
      ctx.revert();
    };
  }, [galleryImages.length]);

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
        <div
          data-gsap-reveal
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <input
            type="date"
            value={checkInDate}
            onChange={(event) => setCheckInDate(event.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <input
            type="date"
            value={checkOutDate}
            onChange={(event) => setCheckOutDate(event.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl outline-none"
          />

          <button
            onClick={handleSearch}
            className="px-4 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
          >
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
                data-gsap-card
                data-gsap-reveal
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300 will-change-transform"
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
                      ${hotel.price}
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
      <section ref={gallerySectionRef} className="py-24 bg-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-title text-center max-w-3xl mx-auto mb-14">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Hotel View Gallery
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
              Explore Luxury Spaces In Motion
            </h2>
            <p className="text-slate-600 mt-5">
              Discover curated room and resort visuals with immersive motion effects for a premium browsing experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                ref={(element) => {
                  galleryCardsRef.current[index] = element;
                }}
                className="rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-200 will-change-transform"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={image}
                    alt={`Hotel gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent" />
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

      {/* Stats */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <p className="text-yellow-500 text-sm uppercase tracking-wider">
                Happy Guests
              </p>
              <h3 className="text-white text-4xl font-bold mt-2">25K+</h3>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <p className="text-yellow-500 text-sm uppercase tracking-wider">
                Premium Hotels
              </p>
              <h3 className="text-white text-4xl font-bold mt-2">500+</h3>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <p className="text-yellow-500 text-sm uppercase tracking-wider">
                Cities Covered
              </p>
              <h3 className="text-white text-4xl font-bold mt-2">100+</h3>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <p className="text-yellow-500 text-sm uppercase tracking-wider">
                Avg. Rating
              </p>
              <h3 className="text-white text-4xl font-bold mt-2">4.8</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Customer Reviews
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
              What Our Guests Say
            </h2>
            <p className="text-slate-600 mt-5">
              Real experiences from travelers who booked their premium stays
              with StayLux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                data-gsap-card
                data-gsap-reveal
                className="bg-white rounded-3xl shadow-lg border border-slate-100 p-7 will-change-transform"
              >
                <FaQuoteLeft className="text-yellow-500 text-2xl" />
                <p className="text-slate-600 leading-8 mt-5">
                  {review.comment}
                </p>
                <div className="mt-6 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {review.name}
                  </h3>
                  <p className="text-slate-500 text-sm">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl px-8 py-14 md:px-14 text-center">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Plan Your Next Stay
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
              Ready For Your Perfect Hotel Experience?
            </h2>
            <p className="text-slate-300 mt-6 max-w-2xl mx-auto leading-8">
              Explore trusted premium stays, compare options, and book your next
              trip in minutes.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hotels"
                className="px-7 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
              >
                Browse Hotels
              </Link>
              <Link
                to="/register"
                className="px-7 py-4 rounded-xl border border-white/40 text-white hover:bg-white hover:text-slate-900 transition"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;