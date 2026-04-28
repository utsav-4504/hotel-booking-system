import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool;

if (process.env.DATABASE_URL) {
  // 🚀 Railway / Production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // 💻 Local
  pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "hotel_booking",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres"
  });
}

// ✅ ADD THIS
const query = (text, params) => pool.query(text, params);

export { query };
export default pool;
