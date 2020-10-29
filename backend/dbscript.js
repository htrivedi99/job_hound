const db = require("./queryHandler");
db.query("SELECT NOW()", (err, res) => {
  if (err) throw err;
  console.log(res);
  console.log("Connected!");

  db.end();
});
