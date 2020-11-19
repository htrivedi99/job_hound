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

// Company Queries

//get all companies
const getAllCompanies = (request, response) => {
  db.query("SELECT FROM * company",(error, results) => {
    if (error) 
      response.status(400).json({ message: error });
    else
      response.status(200).json(results.rows);
  });
  db.end;  
};

//add a new a company to the table
const addNewCompany = (request, response) => {
  db.query(
    "INSERT INTO company(name, size, rating, company_image) VALUES ($1, $2, $3, $4)",
    [
      request["name"],
      request["size"],
      request["rating"],
      request["company_image"],
      
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

//get companies where name starts with a given character
const getCompanyByName = (request, response) => {
  db.query("SELECT * FROM company WHERE name LIKE %$1",
  [
    request["name"],
  ],
  (error, result) => {
    if (error){
      response.status(500).json({ message: error});
    }else{
      console.log(result);
      response.status(201).json({message: results.rows});
    }
  }
);
db.end
};

const 

//get the company info given a company's rating where rating is between two given numeric values
const getCompanyRatingRange = (request, response) => {
  db.query(
    "SELECT * FROM company WHERE $1 >= rating <= $2",
    [
      request["rating"],
    ],
    (error, result) => {
      if (error){
        response.status(500).json({ message: error});
      }else{
        console.log(result);
        response.status(201).json({message: results.rows});
      }
    }
  );
  db.end
};

//update the comapny rating to a certain value given the name of the company
const updateCompanyRatings = (request, response) => {
  db.query("UPDATE company SET rating = $1 WHERE name = $2",
  [
    request["rating"],
    request["name"]
  ],
  (error, result) => {
    if (error){
      response.status(500).json({ message: error});
    }else{
      console.log(result);
      response.status(201).json({message: results.rows});
    }
  }
  );
  db.end;
};

module.exports = {
  getJobPosts,
  addNewJobPost,
  removeJobPost,
  getAllCompanies,
  addNewCompany,
  getCompanyByName,
  getCompanyRatingRange,
  updateCompanyRatings,
};
