const db = require("./postgres");

const getJobPosts = (request, response) => {
  pool.query("SELECT * FROM post", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addNewJobPost = (request, response) => {
  pool.query(
    "INSERT INTO job_postings(requirements,industry,location,position,description,company_name) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      request["requirements"],
      request["industry"],
      request["location"],
      request["position"],
      request["description"],
      request["company_name"],
    ],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
      response.status(201).send("Job added to DB");
    }
  );
};

module.exports = {
  getJobPosts,
  addNewJobPost,
};
