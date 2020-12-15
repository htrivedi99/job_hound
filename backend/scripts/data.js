const { v4: uuidv4 } = require("uuid");
const postgres = require("../postgres");
const MongoClient = require("mongodb").MongoClient;
const ID = process.env.AWS_ID;
const postgresdb = require("../sql");

const positions = [
  "System Architect",
  "System Engineer",
  "UI/UX Design",
  "Frontend Engineer",
  "Backend Engineer",
  "Full-Stack Developer",
  "Database Administrator",
  "Unix Adminstrator",
  "Big Data Analyst",
  "Control Systems Engineer",
  "Software Test Engineer",
  "Test Automation Engineer",
  "Embedded Software Engineer",
  "Electrical Test Engineer",
  "Software Quality Engineer",
  "Web Designer",
  "Android App Developer",
  "IOS App Developer",
  "Data System Analyst",
];

const industries = ["software", "technology", "finance", "automotive", "space"];

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, arcu vel sagittis rhoncus, magna elit porta sapien, non ullamcorper turpis diam a lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum tellus at velit volutpat convallis. Cras sodales nisi sit amet lectus auctor, vitae tristique enim malesuada. Aliquam ac quam et nisi lobortis dictum. Donec tincidunt porttitor leo id accumsan. Duis et porttitor risus, sit amet faucibus lacus. Suspendisse potenti. Proin sed nibh dui. Nulla facilisi. Sed augue tellus, rutrum non mollis in, euismod in felis. Nam id euismod risus. Aliquam a nulla posuere nibh ornare condimentum ac eu erat. Etiam leo odio, vestibulum vitae est a, tempus malesuada est. Aenean nec turpis eu orci egestas viverra ut eu eros. Cras ex felis, tincidunt ut mollis quis, vulputate ac enim. Etiam sagittis vulputate mi. Phasellus et porta est. Curabitur mi urna, volutpat vel fringilla in, condimentum et sapien. Vestibulum accumsan tortor neque, sollicitudin luctus massa porttitor vel. Ut sollicitudin urna augue, sed dignissim nisi mollis at. Integer malesuada malesuada diam, non rhoncus arcu vehicula sit amet. Nulla non justo quis justo posuere molestie. Vestibulum mauris augue, gravida ac metus ut, dignissim rhoncus lacus. Fusce tristique feugiat pretium.";

const logourl =
  "https://company-logos01.s3-us-west-1.amazonaws.com/walmart.jpg";

const locations = [
  "Los Angeles, California",
  "Chicago, Illinois",
  "Houston, Texas",
  "San Francisco, California",
  "San Francisco, California",
  "San Francisco, California",
  "San Francisco, California",
  "San Jose, California",
  "San Jose, California",
  "San Ramon, California",
  "Detroit, Michigan",
  "Remote",
  "Tucson, Arizona",
  "Phoenix, Arizona",
  "Seattle, Washington",
  "Seattle, Washington",
  "Seattle, Washington",
  "Seattle, Washington",
  "Santa Ana, California",
  "Santa Monica, California",
  "Tampa, Florida",
  "Miami, Florida",
  "Boston, Massachusetts",
  "Boston, Massachusetts",
  "Boston, Massachusetts",
  "Boston, Massachusetts",
  "Riverside, California",
  "Culver City, California",
  "El Segundo, California",
  "Sunnyvale, California",
  "Sunnyvale, California",
  "Sunnyvale, California",
  "Sunnyvale, California",
  "Sunnyvale, California",
  "Sunnyvale, California",
  "Palo Alto, California",
  "Palo Alto, California",
  "Palo Alto, California",
  "Palo Alto, California",
  "Palo Alto, California",
  "Palo Alto, California",
  "Hawthorne, California",
  "Fremont, California",
  "Fremont, California",
  "Fremont, California",
  "Fremont, California",
  "Fremont, California",
  "Austin, Texas",
  "Austin, Texas",
  "Austin, Texas",
  "Austin, Texas",
];

const jobTypes = ["full-time", "part-time", "contractor"];

const jobLevels = ["entry level", "mid level", "senior"];

const educationLevels = ["", "bachelors", "masters", "phd"];

var readline = require("readline");
const { get } = require("http");
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "companies.txt");

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

readline
  .createInterface({
    input: fs.createReadStream(filePath),
    terminal: false,
  })
  .on("line", function (line) {
    tokens = line.split("\t");
    // console.log(tokens[2]);
    const name = tokens[1].toLowerCase();
    // postgresdb.addNewCompany({
    //   name: name,
    //   industry: industries[getRandomNumberBetween(0, 4)],
    // });
    const jobPostId = uuidv4();
    const data = {
      jobPostId: jobPostId,
      orgName: name,
      jobTitle: positions[getRandomNumberBetween(0, 18)].toLowerCase(),
      jobLocation: locations[getRandomNumberBetween(0, 50)],
      jobDescription: description,
      jobType: jobTypes[getRandomNumberBetween(0, 2)],
      jobLevel: jobLevels[getRandomNumberBetween(0, 2)],
      educationLevel: educationLevels[getRandomNumberBetween(0, 3)],
      industry: industries[getRandomNumberBetween(0, 4)],
      logoUrl: logourl,
    };
  });
// console.log(getRandomNumberBetween(0, 4));
