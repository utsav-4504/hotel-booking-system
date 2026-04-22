import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaEdit,
  FaShieldAlt
} from "react-icons/fa";

function Profile() {
  const user = {
    name: "Utsav Prajapati",
    email: "utsav@example.com",
    phone: "+91 9876543210",
    location: "Ahmedabad, India",
    joined: "January 2026",
    bookings: 8,
    status: "Premium Member"
  };

  const stats = [
    { title: "Total Bookings", value: "08" },
    { title: "Upcoming Trips", value: "02" },
    { title: "Saved Hotels", value: "14" }
  ];

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
                {user.name}
              </h2>

              <p className="text-slate-500 mt-2">{user.status}</p>
            </div>

            <div className="mt-8 space-y-5 text-slate-600">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-500" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-500" />
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-500" />
                <span>{user.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarCheck className="text-yellow-500" />
                <span>Joined {user.joined}</span>
              </div>
            </div>

            <button className="w-full mt-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2">
              <FaEdit />
              Edit Profile
            </button>
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
                    defaultValue={user.name}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    defaultValue={user.phone}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-500 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    defaultValue={user.location}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <button className="mt-6 px-6 py-3 rounded-xl bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition">
                Save Changes
              </button>
            </div>

            {/* Security */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-5">
                <FaShieldAlt className="text-green-600" />

                <h3 className="text-2xl font-bold text-slate-900">
                  Security Settings
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <button className="mt-6 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;