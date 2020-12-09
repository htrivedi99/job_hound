import React, {useEffect, useState} from "react";
import CustomForm from "./profileForm.js";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import "../styles/RecruiterDashboard.css";



function Navbar(){
    const history = useHistory();
    return(
    <div className="company-navbar-top">
        <ul className="company-new-navlink">
            {/* <li><a onClick={this.logoutUser}>Logout</a></li> */}
            <li style={{cursor: "pointer"}}><a>Profile</a></li>   
            <li style={{cursor: "pointer"}}><a onClick={() => history.push("/newJobPostForm")}>Create Job Post</a></li>   
        </ul>
    </div>
    );
}

function RecruiterDashboard(){

    const history = useHistory();
    const [jobPosts, setJobPosts] = useLocalStorage("jobPosts");
    const [actualJobPosts, setActualJobPosts] = useState([]);

    useEffect(() => {
        retrieveAllJobPosts();
     }, []);

    const createNewJobPost = () => {
        history.push("/newJobPostForm");
    }
    const viewJobPosts = () => {
        history.push("/viewJobsPost");
    }
    
    const retrieveAllJobPosts = async() => {
        const data = {
            jobPosts: jobPosts
        }
        const response = await axios.post("/retrieveAllJobPosts", data);
        setActualJobPosts(response.data);
        console.log(response.data);
    }

    const ShowJobPosts = () => {
        let cards = null;
        cards = actualJobPosts.map((post) => (   
            <li onClick={() => history.push({pathname:"/jobPostById", state:{jobPostTitle: post.jobTitle, applicants: post.applicantList}})} style={{ listStyleType: "none", marginLeft: "5%", marginBottom: "5%"}}>
                <div style={{backgroundColor: "#ececf0", width: "300px", height: "150px", textAlign: "center", padding: "10px 10px", borderRadius: "10px", cursor: "pointer"}}>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobTitle}</h1>
                    <hr/>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobLocation}</h1>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobType}</h1>
                    <h1 style={{fontSize: "16px", color: "#16A085"}}>Number of applicants: {post.applicantList.length}</h1>

                </div>
            </li>
           
        ));
        return cards;
    }

    return(
        <div>
        <Navbar/>
        <div>
            <h1 style={{textAlign: "center"}}>Current Job Postings</h1>
            <div style={{display: "flex", justifyContent: "flex-start", width: "100%", flexWrap: "wrap"}}>
                <ShowJobPosts />
                <ShowJobPosts />
           </div>
            
        </div>
        
        </div>
    );
}

export default RecruiterDashboard;
