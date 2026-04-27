import express from "express";
import { body, param } from "express-validator";
import authenticate from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/adminMiddleware.js";
import {
  getHotels,
  getFeaturedHotels,
  getHotelById,
  searchHotels,
  createHotel,
  updateHotel,
  deleteHotel
} from "../controllers/hotelController.js";
import { validateRequest } from "../utils/validator.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/featured", getFeaturedHotels);
router.post("/search", searchHotels);
router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid hotel id"), validateRequest],
  getHotelById
);

router.post(
  "/",
  [
    authenticate,
    requireAdmin,
    body("name").notEmpty().withMessage("Hotel name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    validateRequest
  ],
  createHotel
);

router.put(
  "/:id",
  [
    authenticate,
    requireAdmin,
    param("id").isUUID().withMessage("Invalid hotel id"),
    validateRequest
  ],
  updateHotel
);

router.delete(
  "/:id",
  [
    authenticate,
    requireAdmin,
    param("id").isUUID().withMessage("Invalid hotel id"),
    validateRequest
  ],
  deleteHotel
);

export default router;
