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
  const origins = [...new Set([...configuredOrigins, ...defaults])];
  return origins;
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
    optionsSuccessStatus: 200
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "StayLux API is running"
  });
});

app.get("/api/health", async (req, res, next) => {
  try {
    const dbStatus = await testConnection();

    res.json({
      success: true,
      message: "Server is healthy",
      data: {
        status: "OK",
        timestamp: new Date().toISOString(),
        databaseTime: dbStatus.now
      }
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || "localhost";
const MAX_PORT_RETRIES = 10;
const currentFilePath = fileURLToPath(import.meta.url);
const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === currentFilePath;

const startServer = async () => {
  try {

    await testConnection();
    const startListening = (port, retriesRemaining) =>
      new Promise((resolve, reject) => {
        const server = app.listen(port, HOST, () => {
          console.log(`[server] listening on http://${HOST}:${port}`);
          console.log(
            `[server] environment: ${process.env.NODE_ENV || "development"}`
          );
          console.log(
            `[server] database: ${process.env.DB_NAME || "hotel_booking"}`
          );
          resolve(server);
        });

        server.on("error", (error) => {
          if (error.code === "EADDRINUSE" && retriesRemaining > 0) {
            const nextPort = port + 1;
            console.warn(
              `[server] port ${port} is in use, retrying on ${nextPort}`
            );
            setTimeout(() => {
              startListening(nextPort, retriesRemaining - 1)
                .then(resolve)
                .catch(reject);
            }, 100);
            return;
          }

          reject(error);
        });
      });

    const server = await startListening(PORT, MAX_PORT_RETRIES);

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
