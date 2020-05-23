const Pool = require("pg").Pool;

const pool = new Pool({
  user: "mower",
  password: process.env.DB_PASSWORD,
  host: "127.0.0.1",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;
