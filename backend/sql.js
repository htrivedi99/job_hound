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

const addNewJobPost = (post, cb) => {
  const query = {
    text:
      "INSERT INTO post(requirements,industry,location,position,description,company_name,experience_level,education_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    values: [
      post["requirements"],
      post["industry"],
      post["location"],
      post["position"],
      post["description"],
      post["company_name"],
      post["experience_level"],
      post["education_level"],
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
    text: "DELETE FROM post WHERE id = $1",
    values: [post["id"]],
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
  removeJobPost,
};
