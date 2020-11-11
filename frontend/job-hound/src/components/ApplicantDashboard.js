import React from "react";
import { useHistory } from 'react-router-dom';
import "../styles/ApplicantDashboard.css";
import { faSearch, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function ApplicantDashboard(){
    return(
        <div>
            <Navbar/>
            <div>
                <Filters/>
            </div>
        </div>
       
    );
}

export default ApplicantDashboard;