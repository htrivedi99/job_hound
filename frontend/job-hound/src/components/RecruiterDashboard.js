import React, {useEffect, useState} from "react";
import CustomForm from "./profileForm.js";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    const [actualJobPosts, setActualJobPosts] = useState([]);
    const [userId, setUserId] = useLocalStorage("userId");
    const [userProfile, setUserProfile] = useLocalStorage("userProfile");

    useEffect(() => {
        getUserProfile();
        retrieveAllJobPosts();
        
     }, []);

    const createNewJobPost = () => {
        history.push("/newJobPostForm");
    }
    const viewJobPosts = () => {
        history.push("/viewJobsPost");
    }

    const getUserProfile = async() => {
        const data = {
            userId: userId
        }
        const response = await axios.post("/getRecruiterById", data);
        setUserProfile(response.data);
        console.log(userProfile);
    }
    
    const retrieveAllJobPosts = async() => {
        const tempData = {
            userId: userId
        }
        const jobPostIds = await axios.post("/getAllJobPostIds", tempData);

        const data = {
            jobPosts: jobPostIds.data
        }
        
        const response = await axios.post("/retrieveAllJobPosts", data);
        setActualJobPosts(response.data);
        console.log(response.data);
    }

    const deleteJobPost = async(jobId) => {
        const data = {
            jobId: jobId,
            userId: userId
        }
        const response1 = await axios.post("/deleteJobPostMongo", data);
        const response2 = await axios.post("/removeJob", data);
        console.log(response1.data);
        console.log(response2.data);
        
    }

    const ShowJobPosts = () => {
        let cards = null;
        cards = actualJobPosts.map((post) => (   
            <li style={{ listStyleType: "none", marginLeft: "5%", marginBottom: "5%"}}>
                <div style={{backgroundColor: "#ececf0", width: "300px", height: "180px", textAlign: "center", padding: "10px 10px", borderRadius: "10px", cursor: "pointer"}}>
                    <div onClick={() => history.push({pathname:"/jobPostById", state:{jobPostTitle: post.jobTitle, applicants: post.applicantList}})}>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobTitle}</h1>
                    <hr/>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobLocation}</h1>
                    <h1 style={{fontSize: "16px", color: "#36356b"}}>{post.jobType}</h1>
                    <h1 style={{fontSize: "16px", color: "#16A085"}}>Number of applicants: {post.applicantList.length}</h1>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", width: "100%", height: "30px", marginTop: "20px"}}>
                        <div onClick={e => deleteJobPost(post.jobPostId)} style={{width: "30px", height:"30px"}}>
                            <FontAwesomeIcon style={{marginRight: "30px"}} icon={faTrash} size="1x"/>
                        </div>
                    </div>
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
           </div>
            
        </div>
        
        </div>
    );
}

export default RecruiterDashboard;
