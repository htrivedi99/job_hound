require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const postgresdb = require('./queries')
const AWS = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const app = express()
const port = 3001
const ObjectID = require('mongodb').ObjectID; 
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

    app.post("/applicantLogin", (req, res) => {
        jobApplicantCollection.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                res.status(404).json({message: "Email not Found"});
            }
            if(user.password === req.body.password){
                res.status(200).json({"userId": user._id, 
                                      "firstName": user.firstName, 
                                      "lastName":user.lastName 
                                    });
            }
        })
        .catch(err => console.error(err))
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




  }).catch(err => console.error(err))
  


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/getAllJobs', postgresdb.getJobPosts);
app.post('/addJob', postgresdb.addNewJobPost);




app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


