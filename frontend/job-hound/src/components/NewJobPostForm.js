import React, { useState } from "react";
import CustomForm from "./profileForm.js";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import "../styles/NewJobPostForm.css";


function NewJobPostForm(){
    const [userId, setUserId] = useLocalStorage("userId");
    const [userProfile, setUserProfile] = useLocalStorage("userProfile");

    const createNewPost = async(e) => {
        e.preventDefault();
        console.log(inputs.jobTitle, inputs.jobLocation, inputs.jobType);
        const jobPostId = uuidv4();
        const data = {
            jobPostId: jobPostId,
            orgName: userProfile.orgName,
            jobTitle: inputs.jobTitle,
            jobLocation: inputs.jobLocation,
            jobDescription: inputs.jobDescription,
            jobType: jobType,
            jobLevel: jobLevel,
            educationLevel: educationLevel,
            industry: userProfile.industry,
            logoUrl: userProfile.logoUrl
        }

        const post = {
            jobPostId: jobPostId,
            userId: userId
        }

        const query1 = await axios.post("/addNewJobPostMongo", data);
        const query2 = await axios.post("/addJob", data);
        const query3 = await axios.post("/addJobPostRecruiter", post);
       
    }

    const {inputs, handleInputChange, handleSubmit} = CustomForm({jobTitle: "", jobLocation: "", jobDescription: "", jobType: ""}, createNewPost);
    const [jobType, setJobType] = useState();
    const [educationLevel, setEducationLevel] = useState();
    const [jobLevel, setJobLevel] = useState();

    return(
        <div className="new-job-post-container">
            <form onSubmit={createNewPost}>
                <div className="job-post-content">
                <h1>Create New Job Post</h1>
                <div className="form-group">
                    <input type="text" name="jobTitle" id="job-title" placeholder="Job Title" onChange={handleInputChange} value={inputs.jobTitle}/>
                </div>
                <br/>
                <div className="form-group">
                    <input type="text" name="jobLocation" id="job-location" placeholder="Job Location" onChange={handleInputChange} value={inputs.jobLocation}/>
                </div>
                <br/>
                <div>
                    <textarea style={{width: "100%", border: "1px solid #ccc", borderRadius: 5, fontFamily: "Helvetica Neue", fontSize: 18 }}
                    rows={7}
                     name="jobDescription" 
                     id="job-description" 
                     placeholder="Job Description" 
                     onChange={handleInputChange} 
                     value={inputs.jobDescription}/>
                </div>
                <br/>
                <div style={{display: "flex", justifyContent:"space-evenly"}}>
                    <label className="radio-container" onClick={e => {setJobType("full-time")}}>Full-Time
                        <input type="radio" name="radio1"/>
                        <span className="radio-checkmark"></span>
                    </label>
                    <label className="radio-container" onClick={e => {setJobType("part-time")}}>Part-Time
                        <input type="radio" name="radio1"/>
                        <span className="radio-checkmark"></span>
                    </label>
                    <label className="radio-container" onClick={e => {setJobType("contractor")}}>Contractor
                        <input type="radio" name="radio1"/>
                        <span className="radio-checkmark"></span>
                    </label>


                    {/* <input type="radio" id="full-time" name="jobType" value="full-time"/>
                    <label style={{paddingRight: "10px"}} htmlFor="full-time">Full-Time</label>
                    <input type="radio" id="part-time" name="jobType" value="part-time"/>
                    <label style={{paddingRight: "10px"}} htmlFor="full-time">Part-Time</label>
                    <input type="radio" id="contractor" name="jobType" value="contractor"/>
                    <label style={{paddingRight: "10px"}} htmlFor="full-time">Contractor</label> */}
                </div>
                <br/>
                <div style={{display: "flex", justifyContent:"space-evenly"}}>
                    <label className="checkbox-container" onClick={e => {setEducationLevel("bs")}}>B.S.
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-container" onClick={e => {setEducationLevel("ms")}}>M.S.
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="checkbox-container" onClick={e => {setEducationLevel("phd")}}>Ph.D.
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <br/>
                <div style={{display: "flex", justifyContent:"space-evenly"}}>

                    <label className="radio-container" onClick={e => {setJobLevel("entry-level")}}>Entry-Level
                        <input type="radio" name="radio2"/>
                        <span className="radio-checkmark"></span>
                    </label>
                    <label className="radio-container" onClick={e => {setJobLevel("mid-level")}}>Mid-Level
                        <input type="radio" name="radio2"/>
                        <span className="radio-checkmark"></span>
                    </label>
                    <label className="radio-container" onClick={e => {setJobLevel("senior-level")}}>Senior-Level
                        <input type="radio" name="radio2"/>
                        <span className="radio-checkmark"></span>
                    </label>
                    {/* <input type="radio" id="entry-level" name="experienceLevel" value="entry-level"/>
                    <label style={{paddingRight: "10px"}} htmlFor="entry-level">Entry Level</label>

                    <input type="radio" id="mid-level" name="experienceLevel" value="mid-level"/>
                    <label style={{paddingRight: "10px"}} htmlFor="mid-level">Mid Level</label>

                    <input type="radio" id="senior-level" name="experienceLevel" value="senior-level"/>
                    <label style={{paddingRight: "10px"}} htmlFor="senior-level">Senior Level</label> */}
                </div>
                <br/>
                <br/>

                <button className="job-post-btn" type="submit">Create New Job Post</button>
                </div>
            </form>
            
        </div>
    );
}

export default NewJobPostForm;