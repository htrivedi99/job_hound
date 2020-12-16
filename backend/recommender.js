const { MongoClient } = require("mongodb");
require("dotenv").config();

const getRecommendations = (input_post, cb) => {
  var values = [];
  var i = 0;
  for (field in input_post) {
    values[i] = input_post[field];
    i++;
  }
  MongoClient.connect(
    process.env.DB_STRING,
    { useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      const db = client.db("job-db");
      db.collection("jobPosts")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          var index = 0;
          var simarr = [];
          for (post of result) {
            // console.log(post.jobPostId);
            if (post.jobPostId != input_post.jobPostId) {
              simarr[index] = {
                key: post.jobPostId,
                val: getSimilarity(input_post, post, values),
              };
              index++;
            }
          }
          simarr = simarr.sort(function (a, b) {
            return a.val - b.val;
          });
          results = simarr.slice(0, 5).map((i) => {
            return i.key;
          });
          cb(null, results);
          client.close();
        });
    }
  );
};

const getSimilarity = (post1, post2, values) => {
  v1 = vectorize(post1, values);
  v2 = vectorize(post2, values);
  var dotproduct = 0;
  var mA = 0;
  var mB = 0;
  for (var i = 0; i < v1.length; i++) {
    dotproduct += v1[i] * v2[i];
    mA += v1[i] * v1[i];
    mB += v2[i] * v2[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = dotproduct / (mA * mB);
  return similarity;
};

const vectorize = (post, values) => {
  var vector = [];
  var i = 0;
  for (field in post) {
    // console.log(post[field]);
    if (post[field] == values[i]) {
      vector[i] = 1;
    } else {
      vector[i] = 0;
    }
    i++;
  }
  return vector;
};

// const getRecommendations = (input_posts, cb) => {
//   MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true })
//     .then((client) => {
//       const db = client.db("job-db");
//       const jobPosts = db.collection("jobPosts");
//       jobPosts.find({}) => {
//         if (!posts) {
//           err = "no post found";
//           cb(err, null);
//         } else {
//           res = posts;
//           cb(null, res);
//         }
//       });
//     })
//     .catch((err) => console.error(err));
// };

getRecommendations(
  {
    _id: "5fd717a48a4ffe159ee1c4ac",
    jobPostId: "253b4931-e6ac-4673-91f0-21dd54207ad2",
    orgName: "amazon",
    jobTitle: "Software Engineer",
    jobLocation: "Seattle, WA",
    jobType: "full-time",
    applicantList: [
      {
        applicantId: "5fa24d629102adb527792019",
        firstName: "New Name",
        lastName: "test",
        applicationStatus: "In review",
      },
      {
        applicantId: "5fd7e59fd5c05d26050f4601",
        firstName: "New Name",
        applicationStatus: "In review",
      },
      {
        applicantId: "5fd7e59fd5c05d26050f4601",
        firstName: "John",
        lastName: "Doe",
        applicationStatus: "In review",
      },
    ],
  },
  function (err, res) {
    if (err) {
      console.log(err);
    } else {
      // for (post of res) {
      //   console.log(post.orgName);
      // }
      // console.log(
      //   vectorize(res[0], [
      //     "5fd717a48a4ffe159ee1c4ac",
      //     "253b4931-e6ac-4673-91f0-21dd54207ad2",
      //     "amazon",
      //     "Software Engineer",
      //     "Seattle, WA",
      //     "full-time",
      //     [],
      //   ])
      // );
      console.log(
        // getSimilarity(res[0], res[1], [
        //   "5fd717a48a4ffe159ee1c4ac",
        //   "253b4931-e6ac-4673-91f0-21dd54207ad2",
        //   "amazon",
        //   "Software Engineer",
        //   "Seattle, WA",
        //   "full-time",
        //   [],
        // ])
        res
      );
    }
  }
);

module.exports = {
  getRecommendations,
};
