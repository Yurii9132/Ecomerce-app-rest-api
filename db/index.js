require("dotenv").config();
const { Pool } = require("pg");
const AppError = require('../utils/AppError');

const pool = new Pool({
  user: process.env.DB_USER, // Use values from .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error("Database query error:", err);
    throw new AppError("Database query failed", 500);
  }
};

module.exports = { query, pool };
