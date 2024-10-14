const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "electronic_devices",
  password: "password",
  port: 5432,
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = query;
