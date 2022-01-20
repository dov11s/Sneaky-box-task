const { createPool } = require("mysql");
require("dotenv").config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.query("SET time_zone = '+00:00'");

module.exports = pool;
