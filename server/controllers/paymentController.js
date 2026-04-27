import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/sendResponse.js";
import { createHttpError } from "../utils/validator.js";

const canManageResource = (req, resourceUserId) =>
  req.user.id === resourceUserId ||
  req.user.role === "admin" ||
  req.user.role === "staff";

const createPayment = asyncHandler(async (req, res) => {
  const bookingId = req.body.bookingId || req.body.booking_id;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw createHttpError(404, "Booking not found");
  }

  if (!canManageResource(req, booking.userId)) {
    throw createHttpError(403, "You cannot pay for this booking");
  }

  const payment = await Payment.create({
    bookingId,
    amount: req.body.amount,
    paymentMethod:
      req.body.paymentMethod || req.body.payment_method,
    transactionId:
      req.body.transactionId || req.body.transaction_id
  });

  return sendResponse(res, {
    statusCode: 201,
    message: "Payment created successfully",
    data: payment
  });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const paymentId = req.body.paymentId || req.body.payment_id;
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw createHttpError(404, "Payment not found");
  }

  if (!canManageResource(req, payment.userId)) {
    throw createHttpError(403, "You cannot verify this payment");
  }

  const updatedPayment = await Payment.verify({
    paymentId,
    transactionId:
      req.body.transactionId || req.body.transaction_id,
    status: req.body.status || "completed"
  });

  return sendResponse(res, {
    message: "Payment verified successfully",
    data: updatedPayment
  });
});

const getPaymentHistory = asyncHandler(async (req, res) => {
  const payments = await Payment.listByUser(req.user.id);

  return sendResponse(res, {
    message: "Payment history fetched successfully",
    data: payments
  });
});

const refundPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    throw createHttpError(404, "Payment not found");
  }

  const refundedPayment = await Payment.refund(req.params.id, {
    amount: req.body.amount,
    reason: req.body.reason
  });

  return sendResponse(res, {
    message: "Payment refunded successfully",
    data: refundedPayment
  });
});

const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    throw createHttpError(404, "Payment not found");
  }

  if (!canManageResource(req, payment.userId)) {
    throw createHttpError(403, "You cannot view this payment");
  }

  return sendResponse(res, {
    message: "Payment fetched successfully",
    data: payment
  });
});

export {
  createPayment,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
  getPaymentById
};
