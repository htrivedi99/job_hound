const db = require("../postgres");
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
const industries = [
  "software engineering",
  "software development",
  "IT",
  "information technology",
  "information systems",
  "web development",
  "mobile app development",
  "sofware testing",
  "space systems",
  "insurance",
  "bioinformatics",
  "cyber defense",
  "flight automation",
];
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
const education_levels = [
  "bachelor's degree in computer science, computer engineering or relevant",
  "bachelor's degree in computer science",
  "bachelor's degree in computer enginnering",
  "bachelor's degree in electrical enginnering or equivalent",
  "currently pursuing a 4-year degree",
  "high school diploma",
  "master's degree in computer science or equivalent",
  "PhD in computer science, computer enginnering, electrical engineering or related field",
  "none",
];
const experience_levels = [
  "full-time",
  "part-time",
  "entry-level",
  "senior",
  "junior",
  "intern",
  "co-op",
  "student",
];
const requirements =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, arcu vel sagittis rhoncus, magna elit porta sapien, non ullamcorper turpis diam a lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum tellus at velit volutpat convallis. Cras sodales nisi sit amet lectus auctor, vitae tristique enim malesuada. Aliquam ac quam et nisi lobortis dictum. Donec tincidunt porttitor leo id accumsan. Duis et porttitor risus, sit amet faucibus lacus. Suspendisse potenti. Proin sed nibh dui. Nulla facilisi. Sed augue tellus, rutrum non mollis in, euismod in felis. Nam id euismod risus. Aliquam a nulla posuere nibh ornare condimentum ac eu erat. Etiam leo odio, vestibulum vitae est a, tempus malesuada est. Aenean nec turpis eu orci egestas viverra ut eu eros. Cras ex felis, tincidunt ut mollis quis, vulputate ac enim. Etiam sagittis vulputate mi. Phasellus et porta est. Curabitur mi urna, volutpat vel fringilla in, condimentum et sapien. Vestibulum accumsan tortor neque, sollicitudin luctus massa porttitor vel. Ut sollicitudin urna augue, sed dignissim nisi mollis at. Integer malesuada malesuada diam, non rhoncus arcu vehicula sit amet. Nulla non justo quis justo posuere molestie. Vestibulum mauris augue, gravida ac metus ut, dignissim rhoncus lacus. Fusce tristique feugiat pretium.";
const description =
  "Morbi vel commodo nunc. Nam pretium a arcu sed molestie. Sed at fermentum lorem, id suscipit libero. Etiam ut leo imperdiet, malesuada tortor non, facilisis nulla. Donec a blandit quam. Curabitur et orci vitae lectus tempor pulvinar. Sed a orci quis metus luctus ullamcorper ac sed nulla. Integer ipsum neque, suscipit non consectetur eget, accumsan ut libero. Nulla at lacus lacinia, iaculis elit eget, porta justo. Proin nec ultricies ante, id feugiat nunc. Proin id nisi ultrices, suscipit nulla id, varius nulla. Curabitur ac risus id turpis imperdiet tempus. Proin egestas tellus velit, tristique tempor libero tincidunt non. Sed laoreet semper felis quis egestas. Sed porttitor nec tellus sit amet faucibus. Nulla molestie sapien nec arcu tincidunt interdum. Sed gravida enim blandit, fermentum urna ut, cursus sem. Praesent velit dolor, sagittis non maximus eu, pharetra eget ante. Cras quis neque vehicula massa sodales dictum vel ac ipsum. Morbi ex augue, gravida in dictum luctus, scelerisque ut augue. Donec in ex velit. Donec consectetur porta orci vitae pellentesque. Praesent sagittis, justo eu feugiat blandit, massa tellus ullamcorper odio, eu pellentesque nunc elit eu massa. Donec facilisis urna ligula, a vestibulum felis lacinia id. Suspendisse pellentesque nibh ipsum, quis efficitur mi accumsan vel";

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// console.log(getRandomNumberBetween(0, 18));
var readline = require("readline");
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "formatted_companies.txt");

readline
  .createInterface({
    input: fs.createReadStream(filePath),
    terminal: false,
  })
  .on("line", function (line) {
    tokens = line.split("\t");
    // console.log(tokens[1]);
    company = tokens[1];
    const query = {
      text:
        "insert into post(requirements,industry,location,position,description,company_name,experience_level,education_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        requirements,
        industries[getRandomNumberBetween(0, 12)],
        locations[getRandomNumberBetween(0, 50)],
        positions[getRandomNumberBetween(0, 18)],
        description,
        company,
        experience_levels[getRandomNumberBetween(0, 7)],
        education_levels[getRandomNumberBetween(0, 8)],
      ],
    };
    db.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Success");
      }
    });
  });
