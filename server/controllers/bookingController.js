import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import { createHttpError, parsePagination } from "../utils/validator.js";

const getOwnershipFlags = (req) => ({
  userId: req.user.id,
  isAdmin: req.user.role === "admin" || req.user.role === "staff"
});

const createBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    userId: req.user.id,
    hotelId: req.body.hotelId || req.body.hotel_id,
    roomId: req.body.roomId || req.body.room_id
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Booking created successfully",
    data: booking
  });
});

const getMyBookings = asyncHandler(async (req, res) => {
  const pagination = parsePagination(req.query);
  const result = await Booking.listByUser(req.user.id, {
    status: req.query.status,
    page: pagination.page,
    limit: pagination.limit
  });

  return sendResponse(res, {
    message: "Bookings fetched successfully",
    data: result.bookings,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit
    }
  });
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw createHttpError(404, "Booking not found");
  }

  const isOwner = booking.userId === req.user.id;
  const isAdmin =
    req.user.role === "admin" || req.user.role === "staff";

  if (!isOwner && !isAdmin) {
    throw createHttpError(403, "You cannot view this booking");
  }

  return sendResponse(res, {
    message: "Booking fetched successfully",
    data: booking
  });
});

const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.cancel(
    req.params.id,
    getOwnershipFlags(req)
  );

  return sendResponse(res, {
    message: "Booking cancelled successfully",
    data: booking
  });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const result = await Booking.remove(
    req.params.id,
    getOwnershipFlags(req)
  );

  return sendResponse(res, {
    message: "Booking deleted successfully",
    data: result
  });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const pagination = parsePagination(req.query);
  const result = await Booking.listAll({
    search: req.query.search,
    status: req.query.status,
    paymentStatus: req.query.paymentStatus || req.query.payment_status,
    page: pagination.page,
    limit: pagination.limit
  });

  return sendResponse(res, {
    message: "All bookings fetched successfully",
    data: result.bookings,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit
    }
  });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.updateStatus(req.params.id, {
    status: req.body.status,
    paymentStatus:
      req.body.paymentStatus || req.body.payment_status
  });

  return sendResponse(res, {
    message: "Booking status updated successfully",
    data: booking
  });
});

export {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus
};
