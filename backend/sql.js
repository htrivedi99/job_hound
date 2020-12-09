const db = require("./postgres");

// const getJobPosts = (request, response) => {
//   db.query("SELECT * FROM job_postings", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };
const getJobPosts = (cb) => {
  const query = {
    text: "SELECT * FROM post;",
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

// const addNewJobPost = (request, response) => {
//   const query = {
//     text:
//     "INSERT INTO job_postings(job_id, company_name, job_title, job_location, job_description, industry, job_type, education_level, experience_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
//     values: [
//       "5cb90da1-75ab-432a-92a9-95186b3eec76",
//       "Company Y",
//       "Data Engineer",
//       "Riverside, CA",
//       "This is a test description",
//       "Tech",
//       "Full Time",
//       "BS",
//       "Entry Level"
//     ],
//   };
//   db.query(query, (err, res) => {
//     if(err){
//       console.log(err);
//     }else{
//       response.status(200).json("Job added successfully");
//     }
//   });
// };

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


const addNewJobPostSQL = (request, response) => {
  const query = {
    text:
    "INSERT INTO job_postings(job_id, company_name, job_title, job_location, job_description, industry, job_type, education_level, experience_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    values: [
      request.body.jobPostId,
      "Company Y",
      request.body.jobTitle,
      request.body.jobLocation,
      request.body.jobDescription,
      "Tech",
      request.body.jobType,
      request.body.educationLevel,
      request.body.jobLevel
    ],
  };
  db.query(query, (err, res) => {
    if(err){
      console.log(err);
    }else{
      response.status(200).json("Job added successfully");
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
  addNewJobPostSQL,
  removeJobPost,
  updateJobPost,
  filterJobPosts
};
