import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight inline-block"
            >
              Stay<span className="text-yellow-500">Lux</span>
            </Link>

            <p className="mt-4 text-slate-400 leading-7">
              Luxury hotel booking experience with premium stays, smooth
              reservations, and trusted destinations worldwide.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Support</h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Cancellation
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>

            <p className="text-slate-400 leading-7 mb-4">
              Get premium offers, travel inspiration and latest updates.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 outline-none focus:border-yellow-500"
              />

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 StayLux. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link to="/" className="hover:text-white transition">
              Terms
            </Link>

            <Link to="/" className="hover:text-white transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;