import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Pages
import Home from "../pages/Home";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Booking from "../pages/Booking";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";

// Admin
import Dashboard from "../admin/Dashboard";
import HotelsManage from "../admin/HotelsManage";
import BookingsManage from "../admin/BookingsManage";
import UsersManage from "../admin/UsersManage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hotels" element={<HotelsManage />} />
          <Route path="bookings" element={<BookingsManage />} />
          <Route path="users" element={<UsersManage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
