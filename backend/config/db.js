const { Pool } = require("pg");

// Create pool but don't connect immediately
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "lease_your_car",
  password: process.env.DB_PASSWORD || "vas04",
  port: process.env.DB_PORT || 5432,
});

// Don't try to connect on startup - just export the pool
module.exports = pool;