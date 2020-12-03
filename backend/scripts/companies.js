const db = require("../postgres");
var readline = require("readline");
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "formatted_companies.txt");

function getRandomNumberBetween(min, max) {
  rating = Math.random() * (max - min + 1) + min;
  return Math.round(rating * 10) / 10;
}

readline
  .createInterface({
    input: fs.createReadStream(filePath),
    terminal: false,
  })
  .on("line", function (line) {
    tokens = line.split("\t");
    // console.log(tokens[2]);
    const query = {
      // text: "select * from company",
      text:
        "insert into company(name, size, rating, image) values ($1, $2, $3, $4)",
      values: [
        tokens[1],
        tokens[2],
        getRandomNumberBetween(2.8, 4),
        "S3_id_here",
      ],
    };
    db.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Success");
      }
    });
  });
