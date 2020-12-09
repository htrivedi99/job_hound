require("dotenv").config();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const postgresdb = require("./sql");
const express = require("express");
const postgres = require("./postgres");
const app = express();
const port = 3001;
const AWS = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const ObjectID = require('mongodb').ObjectID; 
const { v4: uuidv4 } = require('uuid');
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});
const upload = multer({dest:'uploads/'});

const uploadFileToS3 = (fileName, bucketName) => {
  // Read content from the file
  const fileContent = fs.createReadStream(fileName.path);
  let fileKey = `${fileName.originalname}_${new Date().getTime()}`;

  // Setting up S3 upload parameters
  const params = {
      Bucket: bucketName,
      Key: fileKey, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};



const connectionString = process.env.DB_STRING;
//connectionString looks like this
//"mongodb+srv://{username}:{password}@job-app-cluster.2y5pc.mongodb.net/job-db?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('job-db');
    const jobApplicantCollection = db.collection('applicants');
    const jobPostsCollection = db.collection('jobPosts');

    const getJobPost = (jobId) => {

      return new Promise(function(resolve, reject){
        jobPostsCollection.findOne({"jobPostId": jobId})
            .then(jobPost => {
              if(jobPost){
                resolve(jobPost);
              }
            })
            .catch(err => {
              reject(err);
            })
      });
      
    }
    
    
    app.post('/newJobApplicant', (req, res) => {
      console.log(req.body);
        const applicant = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        jobApplicantCollection.insertOne(applicant)
          .then(result => {
            res.status(200).json({"documentId": result.insertedId});
          })
          .catch(error => console.error(error))
    });

    app.post("/newRecruiterUser", (req, res) => {
      //console.log(req.body);
      const recruiter = {
        orgName: req.body.orgName,
        userType: req.body.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    console.log(recruiter)
    jobApplicantCollection.insertOne(recruiter)
      .then(result => {
        res.status(200).json({"documentId": result.insertedId});
      })
      .catch(error => console.error(error))
    });

    app.post("/applicantLogin", (req, res) => {
        jobApplicantCollection.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                res.status(404).json({message: "Email not Found"});
            }
            if(user.password === req.body.password){
              if(user.userType === "recruiter"){
                res.status(200).json({
                "userId": user._id, 
                "firstName": user.firstName, 
                "lastName":user.lastName,
                "userType": user.userType,
                "jobPosts": user.jobPosts
              });
              }else{
                res.status(200).json({"userId": user._id, 
                                      "firstName": user.firstName, 
                                      "lastName":user.lastName,
                                      "userType": user.userType 
                                    });
                    }
            }
        })
        .catch((err) => console.error(err));
    });

    app.post("/uploadResumeToS3", upload.single('file'), async(req, res) => {
      if(req.file){
        const resumeFile = req.file;
        let fileKey = `${resumeFile.originalname}_${new Date().getTime()}`;
        // uploadFileToS3(resumeFile, "job-hound-resumes");
        const uploadRes = await new Promise((resolve, reject) => {
          s3.upload({
            Bucket: "job-hound-resumes",
            Body: fs.createReadStream(resumeFile.path),
            Key: fileKey
          }, (err, data) => err == null ? resolve(data) : reject(err));
        });
        res.json(uploadRes.Location);
      }
     
      
    });

    app.post("/updateApplicantProfile", (req, res) => {
        const profile = req.body.userInfo;
        const workExperience = req.body.workExperience;
        const userId = req.body.userId;
        const resumeUrl = req.body.resumeUrl;

        // console.log(profile);
        // console.log(workExperience);
        // console.log(userId);
        // console.log(resumeUrl);
        console.log(req.body);

        // try{
        //   jobApplicantCollection.updateOne(
        //     {"_id": ObjectID(userId)},
        //     {$set: {
        //       "profile": profile,
        //       "workExperience": workExperience,
        //       "resumeUrl": resumeUrl
        //     }}
        //   )
        //   .then(result => {
        //     if(result){
        //       res.status(200).json({message: "profile updated"});
        //     }
        //   })
        // }catch(e){
        //   console.log(e);
        // }
       
    });

    app.post("/getUserByID", (req, res) => {
      console.log(req.body.userId);
      jobApplicantCollection.findOne({"_id": ObjectID(req.body.userId)})
      .then(user =>{
        console.log(user);
        if(user){
          res.json({
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "profile": user.profile,
            "workExperience": user.workExperience
          });
        }
      });
    });

    app.post("/addNewJobPostMongo", (req, res) => {
      const jobPost = {
        jobPostId: req.body.jobPostId,
        jobTitle: req.body.jobTitle,
        jobLocation: req.body.jobLocation,
        jobType: req.body.jobType,
        applicantList: []
    }
    console.log(jobPost)
    jobPostsCollection.insertOne(jobPost)
      .then(result => {
        res.status(200).json({"documentId": result.insertedId});
      })
      .catch(error => console.error(error))

    });

    app.post("/applyToJob", (req, res) => {
      const jobId = req.body.jobId;
      const userId = req.body.userId;
      const applicationStatus = req.body.applicationStatus;
      console.log(jobId);
      jobPostsCollection.findOne({"jobPostId": jobId})
        .then(results => {
          if(results){
            jobPostsCollection.updateOne(
              {"jobPostId": jobId},
              {$push: {applicantList: {applicantId: userId, applicationStatus: applicationStatus } } }
            ).then(res.status(200).json("Application Sent!"))
      
          }
        })
        .catch(error => console.error(error))
    });

    app.post("/addJobPostRecruiter", (req, res) => {
      const jobId = req.body.jobPostId;
      const userId = req.body.userId;
      jobApplicantCollection.findOne({"_id": ObjectID(req.body.userId)})
      .then(user => {
        if(user){
          jobApplicantCollection.updateOne(
            {"_id": ObjectID(req.body.userId)},
            {$push: {jobPosts: {jobPostId: jobId} } }
            ).then(res.status(200).json("Job Post Created"))
        }
      })
      .catch(error => console.log(error))
    });

    app.post("/retrieveAllJobPosts", async(req, res) => {
      const jobPosts = req.body.jobPosts;
      var allJobPosts = [];
      jobPosts.forEach(post => {
        let promise = getJobPost(post["jobPostId"]);
        allJobPosts.push(promise);

      });
      await Promise.all(allJobPosts)
      .then(results => {
        res.status(200).json(results);
      })
        
    })




  }).catch(err => console.error(err))
  
app.post("/createJobTable", postgresdb.createJobPostTable);

// app.get("/getAllJobs", postgresdb.getJobPosts);
app.get("/getAllJobs", (req, res) => {
  postgresdb.getJobPosts(
    (cb = (err, data) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json({ data: data });
      }
    })
  );
});
// app.post("/addJob", postgresdb.addNewJobPost);
app.post("/addJob", (req, res) => {
  console.log(req.body);
  postgresdb.addNewJobPost(
    req.body,
    (cb = (err, response) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(201).json([{ message: "Success" }, { result: response }]);
      }
    })
  );
});

app.post("/removeJob", (req, res) => {
  postgresdb.removeJobPost(
    req.body,
    (cb = (err, response) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json([{ message: "Success" }, { result: response }]);
      }
    })
  );
});

app.post("/updateJob", (req, res) => {
  postgresdb.updateJobPost(
    req.body,
    (cb = (err, response) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json([{ message: "Success" }, { result: response }]);
      }
    })
  );
});

app.post("/filterJobPosts", (req, res) => {
  postgresdb.filterJobPosts(
    req.body,
    (cb = (err, data) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.status(200).json([{ message: "Success" }, { data: data }]);
      }
    })
  );
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
