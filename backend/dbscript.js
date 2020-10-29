const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "database-1.c2hozwn3f7mo.us-west-2.rds.amazonaws.com",
  database: "",
  password: "job_hound123",
  port: 5432,
});
pool.query("SELECT NOW()", (err, res) => {
  if (err) throw err;
  console.log(res);
  console.log("Connected!");

  pool.end();
});
