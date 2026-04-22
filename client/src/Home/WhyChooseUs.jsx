import React from "react";
import {
  FaShieldAlt,
  FaHeadset,
  FaStar,
  FaBolt
} from "react-icons/fa";
import SectionTitle from "../common/SectionTitle";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Reservations",
      text: "Protected payments, trusted partners and safe booking experience."
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Dedicated travel assistance whenever you need help."
    },
    {
      icon: <FaStar />,
      title: "Premium Hotels",
      text: "Handpicked luxury properties with verified guest reviews."
    },
    {
      icon: <FaBolt />,
      title: "Instant Confirmation",
      text: "Fast booking process with immediate reservation updates."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1400"
              alt="Luxury Room"
              className="rounded-3xl shadow-xl w-full object-cover"
            />

            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-slate-900 rounded-2xl px-6 py-5 shadow-lg">
              <p className="text-3xl font-bold">10k+</p>
              <p className="font-medium">Happy Guests</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionTitle
              tag="Why Choose Us"
              title="Experience Hospitality Beyond Expectations"
              subtitle="We combine premium stays, seamless booking technology and guest-first service for memorable travel experiences."
            />

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition bg-slate-50"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-7">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;