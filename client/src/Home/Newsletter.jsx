import React, { useState } from "react";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import SectionTitle from "../common/SectionTitle";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-yellow-500/20 blur-3xl" />
          <div className="absolute -bottom-14 -left-14 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <SectionTitle
              tag="Newsletter"
              title="Get Exclusive Hotel Deals & Travel Offers"
              subtitle="Subscribe to receive premium stay discounts, seasonal offers and travel inspiration directly to your inbox."
              center
              light
            />

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-xl bg-white text-slate-900 outline-none"
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
                >
                  <FaPaperPlane />
                  Subscribe
                </button>
              </div>
            </form>

            {/* Success */}
            {subscribed && (
              <div className="mt-6 flex items-center justify-center gap-2 text-green-400 font-medium">
                <FaCheckCircle />
                Successfully subscribed!
              </div>
            )}

            {/* Note */}
            <p className="mt-6 text-center text-sm text-slate-400">
              No spam. Only curated travel offers and updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;