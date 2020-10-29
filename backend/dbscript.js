const db = require("./queryHandler");
db.query("SELECT * FROM company", (err, res) => {
  if (err) throw err;
  console.log(res);
  console.log("Success!");

  db.end();
});
