import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { gsap } from "gsap";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHotel
} from "react-icons/fa";
import { useEffect, useRef } from "react";

function Login() {
  const navigate = useNavigate();
  const { login, isLoading, user, changePassword } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const popupOverlayRef = useRef(null);
  const popupCardRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const loggedInUser = await login(formData);
      if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/profile");
    } catch (error) {
      setErrorMsg(error || "Login failed");
    }
  };

  useEffect(() => {
    if (!showPasswordPopup || !popupOverlayRef.current || !popupCardRef.current) {
      return;
    }

    gsap.fromTo(
      popupOverlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.25, ease: "power2.out" }
    );

    gsap.fromTo(
      popupCardRef.current,
      { autoAlpha: 0, y: 40, scale: 0.92 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
    );
  }, [showPasswordPopup]);

  const closeChangePasswordPopup = () => {
    if (!popupOverlayRef.current || !popupCardRef.current) {
      setShowPasswordPopup(false);
      return;
    }

    gsap.to(popupOverlayRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in"
    });

    gsap.to(popupCardRef.current, {
      autoAlpha: 0,
      y: 25,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setShowPasswordPopup(false);
      }
    });
  };

  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    setChangePasswordError("");
    setChangePasswordSuccess("");

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      setChangePasswordError("New password and confirm password must match.");
      return;
    }

    if (changePasswordForm.newPassword.length < 6) {
      setChangePasswordError("New password must be at least 6 characters.");
      return;
    }

    try {
      await login({
        email: changePasswordForm.email,
        password: changePasswordForm.currentPassword
      });

      await changePassword({
        currentPassword: changePasswordForm.currentPassword,
        newPassword: changePasswordForm.newPassword
      });

      setChangePasswordSuccess("Password updated successfully.");
      setChangePasswordForm({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      setChangePasswordError(error || "Unable to change password.");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-slate-900 text-white p-12 relative">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-slate-900 flex items-center justify-center text-2xl mb-6">
                <FaHotel />
              </div>

              <p className="uppercase tracking-[0.3em] text-yellow-500 text-sm font-semibold">
                Welcome Back
              </p>

              <h1 className="text-5xl font-bold mt-4 leading-tight">
                Premium Stay Begins Here
              </h1>

              <p className="mt-6 text-slate-300 leading-8">
                Login to manage bookings, view reservations, and unlock luxury
                travel experiences worldwide.
              </p>
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950" />
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest">
              Account Access
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              Sign In
            </h2>

            <p className="text-slate-500 mt-3">
              Enter your credentials to continue.
            </p>
            {errorMsg && (
              <div className="mt-5 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}
            {user && (
              <div className="mt-5 bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm">
                You are already signed in as {user.name}.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Extra */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link
                  to="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowPasswordPopup(true);
                    setChangePasswordError("");
                    setChangePasswordSuccess("");
                  }}
                  className="text-slate-900 font-medium hover:text-yellow-500 transition"
                >
                  Change Password
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
              >
                {isLoading ? "Signing in..." : "Login Now"}
              </button>
            </form>

            {/* Bottom */}
            <p className="mt-6 text-slate-600 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-slate-900 hover:text-yellow-500 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showPasswordPopup && (
        <div
          ref={popupOverlayRef}
          className="fixed inset-0 z-50 bg-slate-950/65 flex items-center justify-center px-4"
        >
          <div
            ref={popupCardRef}
            className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-7"
          >
            <h3 className="text-2xl font-bold text-slate-900">Change Password</h3>
            <p className="text-slate-500 mt-2 text-sm">
              Enter your credentials and set a new password.
            </p>

            {changePasswordError && (
              <div className="mt-4 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                {changePasswordError}
              </div>
            )}
            {changePasswordSuccess && (
              <div className="mt-4 bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm">
                {changePasswordSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="mt-5 space-y-4">
              <input
                type="email"
                placeholder="Email address"
                required
                value={changePasswordForm.email}
                onChange={(event) =>
                  setChangePasswordForm((prev) => ({
                    ...prev,
                    email: event.target.value
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />
              <input
                type="password"
                placeholder="Current password"
                required
                value={changePasswordForm.currentPassword}
                onChange={(event) =>
                  setChangePasswordForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />
              <input
                type="password"
                placeholder="New password"
                required
                value={changePasswordForm.newPassword}
                onChange={(event) =>
                  setChangePasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                required
                value={changePasswordForm.confirmPassword}
                onChange={(event) =>
                  setChangePasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              />

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeChangePasswordPopup}
                  className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;