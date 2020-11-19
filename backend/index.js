require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const postgresdb = require("./sql");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const connectionString = process.env.DB_STRING;
//connectionString looks like this
//"mongodb+srv://{username}:{password}@job-app-cluster.2y5pc.mongodb.net/job-db?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("job-db");
    const jobApplicantCollection = db.collection("applicants");

    app.post("/newJobApplicant", (req, res) => {
      const applicant = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      jobApplicantCollection
        .insertOne(applicant)
        .then((result) => {
          res.json(result);
        })
        .catch((error) => console.error(error));
    });

    app.post("/applicantLogin", (req, res) => {
      jobApplicantCollection
        .findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "Email not Found" });
          }
          if (user.password === req.body.password) {
            res.status(200).json({ message: "Logged In" });
          }
        })
        .catch((err) => console.error(err));
    });

    app.post("/updateApplicantProfile", (req, res) => {
      let testWorkExperience = [
        {
          jobPosition: "Software Engineer",
          companyName: "The Boring Company",
          location: "LA, California",
          startDate: "January 2019",
          endDate: "April 2020",
          workExperience:
            "- Lorem ipsum dolor sit amet, consectetur adipisicing elit. \n- Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. \n- Voluptatum ducimus voluptates voluptas?",
        },
      ];
    });
  })
  .catch((err) => console.error(err));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/getAllJobs", postgresdb.getJobPosts);

app.post("/addJob", (req, res) => {
  console.log(req.body);
  postgresdb.addNewJobPost(req.body);
  res.status(200).json({ message: "Sucess" });
});

app.post("/removeJob", (req, res) => {
  console.log(req.body);
  postgresdb.removeJobPost(req.body);
  res.status(200).json({ message: "Sucess" });
});
app.get("/getAllCompanies", postgresdb.getAllCompanies);

app.post("/addNewCompany", (req, res) => {
  console.log(req.body);
  postgresdb.getAllCompanies(req.body);
  res.status(200).json({ message: "Sucess" });
});

app.get("/getCompanyByName", (req, res) => {
  console.log(req.body);
  postgresdb.getCompanyByName(req.body);
  res.status(200).json({ message: "Sucess" });
});

app.get("/getCompanyRatingRange", (req, res) => {
  console.log(req.body);
  postgresdb.getCompanyRatingRange(req.body);
  res.status(200).json({ message: "Sucess" });
});

app.get("/getCompanyRatingRange", (req, res) => {
  console.log(req.body);
  postgresdb.getCompanyRatingRange(req.body);
  res.status(200).json({ message: "Sucess" });
});

app.get("/updateComapnyRating", (req, res) => {
  console.log(req.body);
  postgresdb.updateCompanyRatings(req.body);
  res.status(200).json({ message: "Sucess" });
});





app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
