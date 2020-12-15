import React, {useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../styles/ApplicantDashboard.css";
import { faSearch, faChevronDown, faClock, faBriefcase, faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocalStorage} from "./localStorage.js";
import axios from "axios";

function Navbar({callback}){
    const history = useHistory();
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
      setSearch(event.target.value);
    }

    const launchSearch = () => {
       callback("position", search);
    }

    return(
    <div className="navbar-top">
        <div className="search-box">
            <div className="search-btn" onClick={launchSearch}>
                <FontAwesomeIcon icon={faSearch} style={{color: "#00416d"}}/>
            </div>
            <input className="search-txt" type="text" name="" placeholder="Search jobs" value={search} onChange={e => {handleChange(e)}}/>
        </div>
        <ul className="new-navlink">
            {/* <li><a onClick={this.logoutUser}>Logout</a></li> */}
            <li style={{cursor: "pointer"}}><a onClick={() => history.push("/applicantProfile")}>Profile</a></li>
            <li style={{cursor: "pointer"}}><a href="#">Messages</a></li>   
            <li style={{cursor: "pointer"}}><a onClick={() => history.push("/applicantDashboard")}>Browse</a></li> 
        </ul>
    </div>
    );
}

function Filters({ callback }){


    return(
        <div className="filters">
               <ul className="categories">

                  <div className="dropdown">
                     <button className="dropbtn">
                        <span>Job Type</span>
                        <span className="chevron">
                              <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                        </button>
                        <div class="dropdown-content">
                           <a onClick={e => callback("job_type", "full-time")}>Full Time</a>
                           <a onClick={e => callback("job_type", "part-time")}>Part Time</a>
                           <a onClick={e => callback("job_type", "contractor")}>Contractor</a>
                        </div>
                  </div>
                     
                     <div className="dropdown">
                        <button className="dropbtn">
                           <span>Industry</span>
                           <span className="chevron">
                              <FontAwesomeIcon icon={faChevronDown}/>
                           </span>
                        </button>
                        <div class="dropdown-content">
                           <a onClick={e => callback("industry", "technology")}>Technology</a>
                           <a onClick={e => callback("industry", "retail")}>Retail</a>
                           <a onClick={e => callback("industry", "footwear and accessories")}>Footwear and Athletics</a>
                           <a onClick={e => callback("industry", "aerospace")}>Aerospace</a>
                           <a onClick={e => callback("industry", "finance")}>Finance</a>
                           <a onClick={e => callback("industry", "automotive")}>Automotive</a>
                           <a onClick={e => callback("industry", "energy")}>Energy</a>
                           <a onClick={e => callback("industry", "telecommunications")}>Telecommunications</a>
                           <a onClick={e => callback("industry", "entertainment")}>Entertainment</a>
                        </div>
                     </div>

                     <div className="dropdown">
                        <button className="dropbtn">
                           <span>Location</span>
                           <span className="chevron">
                              <FontAwesomeIcon icon={faChevronDown}/>
                           </span>
                        </button>
                        <div class="dropdown-content">
                           <a onClick={e => callback("location", "Seattle, WA")}>Seattle, WA</a>
                           <a onClick={e => callback("location", "San Francisco, CA")}>San Francisco, CA</a>
                           <a onClick={e => callback("location", "Mountain View, CA")}>Mountain View, CA</a>
                           <a onClick={e => callback("location", "Sunnyvale, CA")}>Sunnyvale, CA</a>
                           <a onClick={e => callback("location", "Menlo Park, CA")}>Menlo Park, CA</a>
                           <a onClick={e => callback("location", "New York, NY")}>New York, NY</a>
                           <a onClick={e => callback("location", "Palo Alto, CA")}>Palo Alto, CA</a>
                           <a onClick={e => callback("location", "Cupertino, CA")}>Cupertino, CA</a>
                           <a onClick={e => callback("location", "Austin,TX")}>Austin,TX</a>
                           <a onClick={e => callback("location", "Dearborn, MI")}>Dearborn, MI</a>
                           <a onClick={e => callback("location", "Burbank, CA")}>Burbank, CA</a>
                           <a onClick={e => callback("location", "Chicago, IL")}>Chicago, IL</a>
                           <a onClick={e => callback("location", "Redmond, WA")}>Redmond, WA</a>
                        </div>
                     </div>

                     <div className="dropdown">
                        <button className="dropbtn">
                           <span>Education Level</span>
                           <span className="chevron">
                              <FontAwesomeIcon icon={faChevronDown}/>
                           </span>
                        </button>
                        <div class="dropdown-content">
                           <a onClick={e => callback("education_level", "bs")}>B.S</a>
                           <a onClick={e => callback("education_level", "ms")}>M.S</a>
                           <a onClick={e => callback("education_level", "phd")}>P.h.D</a>
                        </div>
                     </div>

                     <div className="dropdown">
                        <button className="dropbtn">
                           <span>Experience Level</span>
                           <span className="chevron">
                              <FontAwesomeIcon icon={faChevronDown}/>
                           </span>
                        </button>
                        <div class="dropdown-content">
                           <a onClick={e => callback("experience_level", "entry-level")}>Entry Level</a>
                           <a onClick={e => callback("experience_level", "mid-level")}>Mid Level</a>
                           <a onClick={e => callback("experience_level", "senior-level")}>Senior Level</a>
                        </div>
                     </div>
                  
                  {/* <span style={{position: "relative"}}>
                     <span>Industry</span>
                        <span className="chevron">
                           <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                  </span>  
                  <span style={{position: "relative"}}>
                     <span>Location</span>
                        <span className="chevron">
                           <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                  </span>  
                  <span style={{position: "relative"}}>
                     <span>Education Level</span>
                        <span className="chevron">
                           <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                  </span>  
                  <span style={{position: "relative"}}>
                     <span>Experience Level</span>
                        <span className="chevron">
                           <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                  </span>   */}
               </ul>
            </div>
    );
}

function JobList(){

   const [jobPosts, setJobPosts] = useState([]);
   const [currentJobPost, setCurrentJobPost] = useState({});
   const [userId, setUserId] = useLocalStorage("userId");
   const [firstName, setFirstName] = useLocalStorage("firstName");
   const [lastName, setLastName] = useLocalStorage("lastName");

   useEffect(() => {
      const fetchJobPosts = async() => {
         document.body.style = 'background: #fff;'; 
          const result = await axios.get("/getAllJobs");
          console.log(result.data);
          const userInfo = await axios.post("/getUserByID", { userId: userId});
          setFirstName(userInfo.data.firstName);
          setLastName(userInfo.data.lastName);
          setJobPosts(result.data.data);
      };
      fetchJobPosts();

  }, []);

  const showJobDescription = (event,job) => {
      event.persist();
      setCurrentJobPost(job);
  }

  const applyToJob = async(jobId) => {
     const data = {
        jobId: jobId,
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        applicationStatus: "In review"
     };
     console.log(userId);
    
   const result = await axios.post("/applyToJob", data);
   console.log(result.data);
   alert(result.data);
   
  }

  const filterJobs = async(field, value) => {
     const data = {
        field: field,
        value: value
     }
     const result = await axios.post("/filterJobPosts", data);
      console.log(field, value);
      //console.log(result);
      if(result.status === 200){
         const queryJobs = result.data[1].data;
         setJobPosts(queryJobs);
      }
  }

  let postsDisplayed = jobPosts.map((item, index) => (
   <li onClick={e => showJobDescription(e,item)} style={{ listStyleType: "none", border: "1px solid #d3d3d3", cursor: "pointer"}}>
   <div style={{width: "100%", backgroundColor: "#fffbf3", height: "15vh", display: "flex"}}>
      <div style={{width: "15%", backgroundColor: "#fff", height: "10vh", alignSelf:"center", margin: "0px 15px", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <img src={item.logo}/>
      </div>
      <div>
      <h1 style={{fontSize: 16, marginTop: 15, marginBottom: 0}}>{item.position}</h1>
      <h1 style={{fontSize: 14, marginTop: 0, fontWeight: 400}}>{item.company_name}</h1>
         <h1 style={{fontSize: 14, margin: 0, fontWeight: 500}}>{item.location}</h1>
         <div style={{display: "flex", margin: 0}}>
            <div style={{display: "flex", justifyContent: "center", alignItems:"center", margin: 0}}>
               <FontAwesomeIcon icon={faClock} style={{color: "black"}}/> 
               <h1 style={{fontSize: 12, marginLeft: "5px", fontWeight: 500}}>3 days ago</h1>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems:"center", marginLeft: "25px"}}>
               <FontAwesomeIcon icon={faBriefcase} style={{color: "black"}}/> 
               <h1 style={{fontSize: 12, marginLeft: "5px", fontWeight: 500}}>{item.job_type}</h1>
            </div>
            
         </div>
      </div>
   </div>
</li>
  ));


   return(
      <div>
         <Navbar callback={filterJobs}/>
         <div>
            <Filters callback={filterJobs}/>
         </div>
      <div style={{display: "flex"}}>
         
         <div style={{backgroundColor:"#fffbf3", width: "35%", height: "80vh", overflow: "auto"}}>
            
               {postsDisplayed}
           
         </div>
         <div style={{width: "65%", padding: "0px 20px", overflow: "auto", height: "85vh"}}>
            <div className="jobPostHeader" style={{display: "flex"}}>
               <div style={{width: "50%"}}>
                  <h1 style={{marginBottom: 0}}>{currentJobPost.position}</h1>
                  <div style={{display: "flex", alignItems: "center"}}>
                     <div style={{width: "15%", height: "7vh", marginRight: "10px"}}>
                        <img src={currentJobPost.logo}/>
                     </div>
                     <h1 style={{margin: 0, fontSize: 20}}>{currentJobPost.company_name}</h1>
                  </div>
               </div>
               <div style={{width: "30%"}}>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                     <FontAwesomeIcon icon={faStar} style={{color: "black"}}/> 
                     <h1 style={{fontSize: 15, margin: "10px"}}>Save</h1>
                  </div>
                  <div style={{display:"flex", justifyContent:"flex-end", width: "100%", height: "6vh"}}>
                     <div onClick={ e => applyToJob(currentJobPost.job_id) } style={{border: "1px solid #C0C0C0", width: "30%", textAlign: "center", borderRadius: "10px", backgroundColor:"green", cursor: "pointer"}}>
                        <h1 style={{fontSize: 15, color:"#fff"}}>Apply</h1>
                     </div>
                     
                  </div>
               </div>
               
            </div>
            <hr/>
            <div style={{whiteSpace: "pre-line"}}>
               <span style={{display:"block", whiteSpace: "pre-line"}}>
                  {currentJobPost.description}
               </span>
            </div>
         </div>
      </div>
      </div>
   );
}

function ApplicantDashboard(){
    return(
        <div>
            {/* <Navbar/> */}
            {/* <div>
                <Filters/>
            </div> */}
            <JobList/>
        </div>
       
    );
}

export default ApplicantDashboard;