const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "lease_your_car",
  password: process.env.DB_PASSWORD || "vas04",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("DB connection error", err));

module.exports = pool;