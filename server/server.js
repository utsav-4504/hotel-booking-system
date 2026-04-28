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

// ✅ CORS setup
const parseAllowedOrigins = () => {
  const configuredOrigins = (
    process.env.CLIENT_URLS ||
    process.env.CLIENT_URL ||
    ""
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const defaults = ["http://localhost:5173", "http://localhost:5433"];
  return [...new Set([...configuredOrigins, ...defaults])];
};

const allowedOrigins = parseAllowedOrigins();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
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

// ✅ Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StayLux API is running",
  });
});

// ✅ Health route (FIXED)
app.get("/api/health", async (req, res, next) => {
  try {
    const dbStatus = await query("SELECT NOW()");

    res.json({
      success: true,
      message: "Server is healthy",
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        databaseTime: dbStatus.rows[0].now,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ✅ Error handler
app.use(errorHandler);

// ✅ Server config
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";// IMPORTANT for Railway

const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === currentFilePath;

// ✅ Start server
const startServer = async () => {
  try {
    // DB connection check
    await query("SELECT 1");

    const server = app.listen(PORT, HOST, () => {
      console.log(`[server] running on port ${PORT}`);
    });

    return server;
  } catch (error) {
    console.error("[server] failed to start", error);
    process.exit(1);
  }
};

if (isDirectRun) {
  startServer();
}

export { startServer };
export default app;
