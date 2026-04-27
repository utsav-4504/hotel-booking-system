import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/adminMiddleware.js";
import { getDashboardOverview } from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticate, requireAdmin);
router.get("/dashboard", getDashboardOverview);

export default router;
