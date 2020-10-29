const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "database-1.c2hozwn3f7mo.us-west-2.rds.amazonaws.com",
  database: "job_hound",
  password: "job_hound123",
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
