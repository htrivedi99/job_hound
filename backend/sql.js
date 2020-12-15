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
  db.query("CREATE TABLE post(job_id TEXT PRIMARY KEY, company_name TEXT, position TEXT, location TEXT, description TEXT, industry TEXT, job_type TEXT, education_level TEXT, experience_level TEXT, logo TEXT)", (error, results) => {
    if(error){
      throw error;
    }
    response.status(200).json("Job posts table created");
  })
}


const addNewJobPost = (post, cb) => {
  const query = {
    text:
      "INSERT INTO post(job_id,job_type,industry,location,position,description,company_name,experience_level,education_level, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    values: [
      post["jobPostId"],
      post["jobType"],
      post["industry"], 
      post["jobLocation"], 
      post["jobTitle"], 
      post["jobDescription"],
      post["orgName"], 
      post["jobLevel"],
      post["educationLevel"],
      post["logoUrl"]
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
    values: [post["jobId"]],
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

const addNewCompany = (request, response) => {
  const query = {
    text:
    "INSERT INTO companies(companyName,logoUrl,industry) VALUES ($1, $2, $3)",
    values: [
     "walmart",
     "https://company-logos01.s3-us-west-1.amazonaws.com/walmart.jpg",
     "retail"
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

const getCompanyInfo = (post, cb) => {
  const query = {
    text:
      "SELECT * FROM companies WHERE companyname = $1",
    values: [
      post,
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




module.exports = {
  getJobPosts,
  addNewJobPost,
  createJobPostTable,
  removeJobPost,
  updateJobPost,
  filterJobPosts,
  addNewCompany,
  getCompanyInfo
};
