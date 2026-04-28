import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { getMyBookings } from "../services/bookingService";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState([
    { title: "Total Bookings", value: "0" },
    { title: "Upcoming Trips", value: "0" },
    { title: "Cancelled Trips", value: "0" }
  ]);
  const [bookingList, setBookingList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName || user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getMyBookings();
        const bookings = response.bookings || [];
        setBookingList(bookings);
        setStats([
          { title: "Total Bookings", value: String(bookings.length) },
          {
            title: "Upcoming Trips",
            value: String(bookings.filter((item) => item.status !== "cancelled").length)
          },
          {
            title: "Cancelled Trips",
            value: String(bookings.filter((item) => item.status === "cancelled").length)
          }
        ]);
      } catch (error) {}
    };
    loadStats();
  }, []);

  return (
    <section className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest">
            My Account
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3">
            Profile Dashboard
          </h1>

          <p className="text-slate-600 mt-4">
            Manage your personal information, bookings and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-6xl text-slate-700">
                <FaUserCircle />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-5">
                {user?.name}
              </h2>

              <p className="text-slate-500 mt-2">{user?.role}</p>
            </div>

            <div className="mt-8 space-y-5 text-slate-600">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <span>{user?.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-500" />
                <span>{user?.phone || "-"}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span>Role: {user?.role}</span>
              </div>
            </div>

            {message && <p className="mt-5 text-sm text-green-600">{message}</p>}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg p-6"
                >
                  <p className="text-slate-500 text-sm">{item.title}</p>

                  <h3 className="text-3xl font-bold text-slate-900 mt-3">
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={profileForm.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">Role</label>
                  <input type="text" value={user?.role || ""} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMessage("");
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition inline-flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
                <button
                  onClick={async () => {
                    await updateProfile({ fullName: profileForm.fullName, phone: profileForm.phone });
                    setIsEditing(false);
                    setMessage("Profile updated successfully");
                  }}
                  disabled={!isEditing}
                  className="px-6 py-3 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Booking List */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                My Booking List
              </h3>

              {bookingList.length === 0 ? (
                <p className="text-slate-500">No bookings available yet.</p>
              ) : (
                <div className="space-y-4">
                  {bookingList.slice(0, 6).map((booking) => {
                    const statusClass =
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700";

                    return (
                      <div
                        key={booking.id}
                        className="border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {booking.hotel?.name || "Hotel"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {booking.checkInDate} to {booking.checkOutDate}
                          </p>
                          <p className="text-sm text-slate-500">
                            Booking #{booking.bookingNumber}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="font-bold text-slate-900">
                            ${booking.totalAmount}
                          </p>
                          <span
                            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}
                          >
                            {booking.statusLabel || booking.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;