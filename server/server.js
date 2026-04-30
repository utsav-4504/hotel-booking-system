import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { query } from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import errorHandler from "./middleware/errorHandler.js";
import requestLogger from "./middleware/requestLogger.js";

dotenv.config();

const app = express();

/* ===============================
   CORS CONFIG
================================= */
const parseAllowedOrigins = () => {
  const normalizeOrigin = (origin = "") => origin.trim().replace(/\/+$/, "");
  const configuredOrigins = (
    process.env.CLIENT_URLS ||
    process.env.CLIENT_URL ||
    ""
  )
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

  const defaults = ["http://localhost:5173", "http://localhost:5433"];
  return [...new Set([...configuredOrigins, ...defaults])];
};

const allowedOrigins = parseAllowedOrigins();

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      const normalizedOrigin = origin.replace(/\/+$/, "");
      const isConfiguredOrigin = allowedOrigins.includes(normalizedOrigin);
      let isVercelPreview = false;
      try {
        isVercelPreview = /\.vercel\.app$/.test(
          new URL(normalizedOrigin).hostname
        );
      } catch {
        isVercelPreview = false;
      }

      if (isConfiguredOrigin || isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${normalizedOrigin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);

app.use(requestLogger);

/* ===============================
   ROUTES
================================= */

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 StayLux API is running",
  });
});

// Health check
app.get("/api/health", async (req, res, next) => {
  try {
    const result = await query("SELECT NOW()");

    res.json({
      success: true,
      message: "Server is healthy",
      data: {
        status: "OK",
        time: result.rows[0].now,
      },
    });
  } catch (error) {
    next(error);
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

/* ===============================
   ERROR HANDLING
================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

/* ===============================
   SERVER START
================================= */

const PORT = Number(process.env.PORT) || 8080;
const HOST =
  process.env.HOST ||
  (process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost");
const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === currentFilePath;

const startServer = async () => {
  try {
    // DB check
    await query("SELECT 1");

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

if (isDirectRun) {
  startServer();
}

export default app;
