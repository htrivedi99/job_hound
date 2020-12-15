require("dotenv").config();
const { Pool } = require("pg");
// const pool = new Pool({
//   user: "postgres",
//   host: process.env.HOST,
//   database: "job_hound",
//   password: process.env.PGPW,
//   port: 5432,
// });
const pool = new Pool({
  user: "me",
  host: 'localhost',
  database: "jobhound",
  password: 'password',
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
