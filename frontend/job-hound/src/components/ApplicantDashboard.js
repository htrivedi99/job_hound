import React, {useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../styles/ApplicantDashboard.css";
import { faSearch, faChevronDown, faClock, faBriefcase, faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useLocalStorage} from "./localStorage.js";
import axios from "axios";

function Navbar(){
    const history = useHistory();
    return(
    <div className="navbar-top">
        <div className="search-box">
            <div className="search-btn">
                <FontAwesomeIcon icon={faSearch} style={{color: "#00416d"}}/>
            </div>
            <input className="search-txt" type="text" name="" placeholder="Search jobs"/>
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

function Filters(){
    return(
        <div className="filters">
               <ul className="categories">
                  <span style={{position: "relative"}}>
                     <span>Job Type</span>
                        <span className="chevron">
                           <FontAwesomeIcon icon={faChevronDown}/>
                        </span>
                  </span>      
                  
                  <span style={{position: "relative"}}>
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
                  </span>  
               </ul>
            </div>
    );
}

function JobList(){

   const [jobPosts, setJobPosts] = useState([]);
   const [currentJobPost, setCurrentJobPost] = useState({});
   const [userId, setUserId] = useLocalStorage("userId");

   useEffect(() => {
      const fetchJobPosts = async() => {
          const result = await axios.get("/getAllJobs");
          console.log(result.data);
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
        applicationStatus: "In review"
     };
   const result = await axios.post("/applyToJob", data);
   console.log(result.data);
  }

  let postsDisplayed = jobPosts.map((item, index) => (
   <li onClick={e => showJobDescription(e,item)} style={{ listStyleType: "none", border: "1px solid #d3d3d3", cursor: "pointer"}}>
   <div style={{width: "100%", backgroundColor: "#fffbf3", height: "15vh", display: "flex"}}>
      <div style={{width: "15%", backgroundColor: "black", height: "10vh", alignSelf:"center", margin: "0px 15px"}}>
         Logo
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
      <div style={{display: "flex"}}>
         <div style={{backgroundColor:"#fffbf3", width: "35%", height: "80vh", overflow: "auto"}}>
            
               {postsDisplayed}
           
         </div>
         <div style={{width: "65%", padding: "0px 20px", overflow: "auto"}}>
            <div className="jobPostHeader" style={{display: "flex"}}>
               <div style={{width: "50%"}}>
                  <h1 style={{marginBottom: 0}}>{currentJobPost.position}</h1>
                  <div style={{display: "flex", alignItems: "center"}}>
                     <div style={{width: "15%", backgroundColor: "black", height: "7vh", marginRight: "10px"}}>
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
   );
}

function ApplicantDashboard(){
    return(
        <div>
            <Navbar/>
            <div>
                <Filters/>
            </div>
            <JobList/>
        </div>
       
    );
}

export default ApplicantDashboard;