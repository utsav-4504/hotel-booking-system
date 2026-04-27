import express from "express";
import { body, param } from "express-validator";
import authenticate from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/adminMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { validateRequest } from "../utils/validator.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  [
    body("hotelId")
      .optional()
      .isUUID()
      .withMessage("hotelId must be a valid UUID"),
    body("hotel_id")
      .optional()
      .isUUID()
      .withMessage("hotel_id must be a valid UUID"),
    body("roomId")
      .optional()
      .isUUID()
      .withMessage("roomId must be a valid UUID"),
    body("room_id")
      .optional()
      .isUUID()
      .withMessage("room_id must be a valid UUID"),
    body().custom((value, { req }) => {
      if (!req.body.hotelId && !req.body.hotel_id) {
        throw new Error("hotelId is required");
      }

      if (!req.body.roomId && !req.body.room_id) {
        throw new Error("roomId is required");
      }

      if (!req.body.checkInDate && !req.body.checkIn) {
        throw new Error("Check-in date is required");
      }

      if (!req.body.checkOutDate && !req.body.checkOut) {
        throw new Error("Check-out date is required");
      }

      return true;
    }),
    body("numberOfGuests")
      .optional()
      .isInt({ min: 1 })
      .withMessage("numberOfGuests must be at least 1"),
    body("guests")
      .optional()
      .custom((value) => {
        if (Array.isArray(value)) {
          return true;
        }

        return Number(value) >= 1;
      })
      .withMessage("guests must be a positive number or an array"),
    validateRequest
  ],
  createBooking
);

router.get("/my-bookings", getMyBookings);
router.get(
  "/",
  authorizeRoles("admin", "staff"),
  getAllBookings
);
router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid booking id"), validateRequest],
  getBookingById
);
router.patch(
  "/:id/cancel",
  [param("id").isUUID().withMessage("Invalid booking id"), validateRequest],
  cancelBooking
);
router.delete(
  "/:id",
  [param("id").isUUID().withMessage("Invalid booking id"), validateRequest],
  deleteBooking
);
router.patch(
  "/:id/status",
  [
    authorizeRoles("admin", "staff"),
    param("id").isUUID().withMessage("Invalid booking id"),
    body("status")
      .optional()
      .isIn([
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "no-show"
      ]),
    body("paymentStatus")
      .optional()
      .isIn(["pending", "completed", "failed", "refunded"]),
    body("payment_status")
      .optional()
      .isIn(["pending", "completed", "failed", "refunded"]),
    validateRequest
  ],
  updateBookingStatus
);

export default router;
