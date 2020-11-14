const db = require("./postgres");

const getJobPosts = (request, response) => {
  db.query("SELECT * FROM post", (error, results) => {
    if (error) {
      response.status(400).json({ message: error });
    } else {
      response.status(200).json(results.rows);
    }
  });
  db.end;
};

const addNewJobPost = (request, response) => {
  db.query(
    "INSERT INTO post(requirements,industry,location,position,description,company_name,experience_level,education_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      request["requirements"],
      request["industry"],
      request["location"],
      request["position"],
      request["description"],
      request["company_name"],
      request["experience_level"],
      request["education_level"],
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ message: error });
      } else {
        console.log(result);
        response.status(201).json({ message: "Job added to DB" });
      }
    }
  );
  db.end;
};

const removeJobPost = (request, response) => {
  db.query(
    "DELETE FROM post WHERE id = $1",
    [request["id"]],
    (error, result) => {
      if (error) {
        response.status(500).json({ message: error });
      } else {
        console.log(result);
        response.status(200).json({ message: "Job removed from DB" });
      }
    }
  );
};

module.exports = {
  getJobPosts,
  addNewJobPost,
  removeJobPost,
};
