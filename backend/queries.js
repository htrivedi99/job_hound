const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'jobhound',
  password: 'password',
  port: 5432,
});

const getJobPosts = (request, response) => {
    pool.query('SELECT * FROM job_postings', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const addNewJobPost = (request, response) => {
    pool.query('INSERT INTO job_postings(company_name,job_title,job_location,job_description,industry,job_type,education_level,experience_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    ['Facebook','Database Engineer', 'Menlo Park, CA', 'Design a good database', 'Technology', 'Part-time', 'MS','2+ years of experience'],
    (error, result) => {
        if(error){
            throw error
        }
        console.log(result);
        response.status(201).send('Job added to DB');
    })
}

  module.exports = {
    getJobPosts,
    addNewJobPost
  }