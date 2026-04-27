import express from "express";
import { body } from "express-validator";

/* CONTROLLERS */
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} from "../controllers/authController.js";

/* MIDDLEWARE */
import authenticate from "../middleware/authMiddleware.js";
import { validateRequest } from "../utils/validator.js";

const router = express.Router();

/* =========================================
   REGISTER
========================================= */
router.post(
  "/register",
  [
    body("fullName")
      .optional()
      .trim(),

    body("name")
      .optional()
      .trim(),

    body()
      .custom((value, { req }) => {
        if (
          !req.body.fullName &&
          !req.body.name
        ) {
          throw new Error(
            "Full name is required"
          );
        }

        return true;
      }),

    body("email")
      .trim()
      .isEmail()
      .withMessage(
        "A valid email is required"
      )
      .normalizeEmail(),

    body("phone")
      .optional()
      .trim()
      .isString()
      .withMessage(
        "Phone must be valid"
      ),

    body("password")
      .trim()
      .isLength({
        min: 6
      })
      .withMessage(
        "Password must be at least 6 characters long"
      ),

    validateRequest
  ],
  register
);

/* =========================================
   LOGIN
========================================= */
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage(
        "A valid email is required"
      )
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage(
        "Password is required"
      ),

    validateRequest
  ],
  login
);

/* =========================================
   GET PROFILE
========================================= */
router.get(
  "/profile",
  authenticate,
  getProfile
);

/* =========================================
   UPDATE PROFILE
========================================= */
router.put(
  "/profile",
  [
    authenticate,

    body("email")
      .not()
      .exists()
      .withMessage(
        "Email cannot be changed from this endpoint"
      ),

    body("fullName")
      .optional()
      .trim(),

    body("name")
      .optional()
      .trim(),

    body("phone")
      .optional()
      .trim(),

    body("profilePictureUrl")
      .optional()
      .trim(),

    body("profile_picture_url")
      .optional()
      .trim(),

    validateRequest
  ],
  updateProfile
);

/* =========================================
   CHANGE PASSWORD
========================================= */
router.put(
  "/change-password",
  [
    authenticate,

    body()
      .custom((value, { req }) => {
        const currentPassword =
          req.body.currentPassword ||
          req.body.current_password;

        const newPassword =
          req.body.newPassword ||
          req.body.new_password;

        if (
          !currentPassword
        ) {
          throw new Error(
            "Current password is required"
          );
        }

        if (!newPassword) {
          throw new Error(
            "New password is required"
          );
        }

        return true;
      }),

    body("newPassword")
      .optional()
      .isLength({
        min: 6
      })
      .withMessage(
        "New password must be at least 6 characters long"
      ),

    body("new_password")
      .optional()
      .isLength({
        min: 6
      })
      .withMessage(
        "New password must be at least 6 characters long"
      ),

    validateRequest
  ],
  changePassword
);

export default router;