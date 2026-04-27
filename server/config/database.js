import { Pool } from "pg";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const getPoolConfig = (databaseName) => ({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: databaseName,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

const DATABASE_NAME = process.env.DB_NAME || "hotel_booking";
let pool = new Pool(getPoolConfig(DATABASE_NAME));
let poolReadyPromise = null;

const attachPoolErrorLogger = (poolInstance) => {
  poolInstance.on("error", (error) => {
    console.error("[db] unexpected idle client error", error);
  });
};

attachPoolErrorLogger(pool);

const ensureDatabaseExists = async () => {
  const adminPool = new Pool(
    getPoolConfig(process.env.DB_ADMIN_DB || "postgres")
  );

  try {
    const existsResult = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1 LIMIT 1",
      [DATABASE_NAME]
    );

    if (!existsResult.rows[0]) {
      await adminPool.query(`CREATE DATABASE "${DATABASE_NAME}"`);
      console.log(`[db] created database "${DATABASE_NAME}"`);
    }
  } finally {
    await adminPool.end();
  }
};

const ensurePoolReady = async () => {
  if (poolReadyPromise) {
    return poolReadyPromise;
  }

  poolReadyPromise = (async () => {
    try {
      await pool.query("SELECT 1");
    } catch (error) {
      if (error.code !== "3D000") {
        throw error;
      }

      await ensureDatabaseExists();
      await pool.end();
      pool = new Pool(getPoolConfig(DATABASE_NAME));
      attachPoolErrorLogger(pool);
      await pool.query("SELECT 1");
    }
  })().catch((error) => {
    poolReadyPromise = null;
    throw error;
  });

  return poolReadyPromise;
};

const query = async (text, params = []) => {
  await ensurePoolReady();
  return pool.query(text, params);
};

const getClient = async () => {
  await ensurePoolReady();
  return pool.connect();
};

const withTransaction = async (callback) => {
  const client = await getClient();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const testConnection = async () => {
  const result = await query("SELECT NOW() AS now");
  return result.rows[0];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "../database/schema.sql");
const seedPath = path.resolve(__dirname, "../database/seed.sql");
let initPromise = null;

const hasTable = async (tableName) => {
  const result = await query("SELECT to_regclass($1) AS table_name", [
    `public.${tableName}`
  ]);
  return Boolean(result.rows[0]?.table_name);
};

const runSqlFile = async (filePath, label) => {
  const sql = await readFile(filePath, "utf8");
  await query(sql);
  console.log(`[db] ${label} executed successfully`);
};

const ensureDatabaseInitialized = async () => {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const isSchemaPresent = await hasTable("hotels");

    if (!isSchemaPresent) {
      console.log("[db] schema not found, bootstrapping database...");
      await runSqlFile(schemaPath, "schema");
      await runSqlFile(seedPath, "seed data");
      return;
    }

    const hasUsers = await hasTable("users");
    const shouldSeed = hasUsers
      ? (await query("SELECT COUNT(*)::int AS total FROM users")).rows[0].total === 0
      : true;

    if (shouldSeed) {
      console.log("[db] empty database detected, loading seed data...");
      await runSqlFile(seedPath, "seed data");
    }
  })().catch((error) => {
    initPromise = null;
    throw error;
  });

  return initPromise;
};

export { query, getClient, withTransaction, testConnection, ensureDatabaseInitialized };
export default pool;
