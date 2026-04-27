import express from "express";
import { body, param } from "express-validator";
import authenticate from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/adminMiddleware.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import { validateRequest } from "../utils/validator.js";

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get("/", getUsers);
router.get(
  "/:id",
  [param("id").isUUID().withMessage("Invalid user id"), validateRequest],
  getUserById
);
router.patch(
  "/:id",
  [
    param("id").isUUID().withMessage("Invalid user id"),
    body("role")
      .optional()
      .isIn(["customer", "admin", "staff"]),
    body("status")
      .optional()
      .isIn(["active", "inactive", "suspended"]),
    validateRequest
  ],
  updateUser
);
router.delete(
  "/:id",
  [param("id").isUUID().withMessage("Invalid user id"), validateRequest],
  deleteUser
);

export default router;
