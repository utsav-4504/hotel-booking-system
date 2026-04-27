import express from "express";
import { body, param } from "express-validator";
import authenticate from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/adminMiddleware.js";
import {
  createPayment,
  verifyPayment,
  getPaymentHistory,
  refundPayment,
  getPaymentById
} from "../controllers/paymentController.js";
import { validateRequest } from "../utils/validator.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/create",
  [
    body("bookingId")
      .optional()
      .isUUID()
      .withMessage("bookingId must be a valid UUID"),
    body("booking_id")
      .optional()
      .isUUID()
      .withMessage("booking_id must be a valid UUID"),
    body().custom((value, { req }) => {
      if (!req.body.bookingId && !req.body.booking_id) {
        throw new Error("bookingId is required");
      }

      if (!req.body.paymentMethod && !req.body.payment_method) {
        throw new Error("paymentMethod is required");
      }

      return true;
    }),
    validateRequest
  ],
  createPayment
);

router.post(
  "/verify",
  [
    body("paymentId")
      .optional()
      .isUUID()
      .withMessage("paymentId must be a valid UUID"),
    body("payment_id")
      .optional()
      .isUUID()
      .withMessage("payment_id must be a valid UUID"),
    body().custom((value, { req }) => {
      if (!req.body.paymentId && !req.body.payment_id) {
        throw new Error("paymentId is required");
      }

      return true;
    }),
    body("status")
      .optional()
      .isIn(["pending", "completed", "failed", "refunded"]),
    validateRequest
  ],
  verifyPayment
);

router.get("/history", getPaymentHistory);
router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid payment id"), validateRequest],
  getPaymentById
);
router.post(
  "/:id/refund",
  [
    requireAdmin,
    param("id").isUUID().withMessage("Invalid payment id"),
    validateRequest
  ],
  refundPayment
);

export default router;
