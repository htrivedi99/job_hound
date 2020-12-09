const db = require("./postgres");


const getJobPosts = (cb) => {
  const query = {
    text: "SELECT * FROM post",
  };
  db.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res.rows);
    }
  });
};

const createJobPostTable = (request, response) => {
  db.query("CREATE TABLE post(job_id TEXT PRIMARY KEY, company_name TEXT, position TEXT, location TEXT, description TEXT, industry TEXT, job_type TEXT, education_level TEXT, experience_level TEXT)", (error, results) => {
    if(error){
      throw error;
    }
    response.status(200).json("Job posts table created");
  })
}

const addNewJobPost = (post, cb) => {
  const query = {
    text:
      "INSERT INTO post(job_id,job_type,industry,location,position,description,company_name,experience_level,education_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    values: [
      post["jobPostId"],
      post["jobType"],
      "tech", 
      post["jobLocation"], 
      post["jobTitle"], 
      post["jobDescription"],
      "Company X", 
      post["jobLevel"],
      post["educationLevel"],
    ],
  };
  db.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res);
    }
  });
};

const removeJobPost = (post, cb) => {
  const query = {
    text: "DELETE FROM post WHERE job_id = $1",
    values: [post["job_id"]],
  };
  db.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res);
    }
  });
};

const updateJobPost = (post, cb) => {
  const query = {
    text: "UPDATE post SET " + post["field"] + " = $1 WHERE id = $2",
    values: [post["value"], post["id"]],
  };
  db.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res);
    }
  });
};

const filterJobPosts = (params, cb) => {
  const query = {
    text: "SELECT * FROM post WHERE " + params["field"] + " ILIKE $1",
    values: ["%" + params["value"] + "%"],
  };
  db.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      cb(err.stack, null);
    } else {
      cb(null, res.rows);
    }
  });
};




module.exports = {
  getJobPosts,
  addNewJobPost,
  createJobPostTable,
  removeJobPost,
  updateJobPost,
  filterJobPosts
};
