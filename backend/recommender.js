const { GameLift } = require("aws-sdk");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const getRecommendations = (user, cb) => {
  MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true })
    .then((client) => {
      const db = client.db("job-db");
      const applicants = db.collection("applicants");
      const posts = db.collection("jobPosts");
      applicants.findOne({ email: user }).then((user) => {
        if (!user) {
          err = "no user found";
          cb(err, null);
        } else {
          posts
            .findOne({ jobPostId: user.jobPosts[0].jobPostId })
            .then((post) => {
              if (!post) {
                err = "no post found";
                cb(err, null);
              } else {
                res = post;
                cb(null, res);
              }
            });
        }
      });
    })
    .catch((err) => console.error(err));
};

getRecommendations("vivek@gmail.com", function (err, res) {
  if (err) {
    console.log(err);
  } else {
    for (field in res) {
      console.log(res[field]);
    }
  }
});
