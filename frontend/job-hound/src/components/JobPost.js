import React, { useState } from "react";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';

function JobPost(){
    const location = useLocation();
    console.log(location.state);
    const [applicantFirstName, setApplicantFirstName] = useState("");
    const [applicantLastName, setApplicantLastName] = useState("");
    const [applicantProfile, setApplicantProfile] = useState("");
    const [applicantWorkHistory, setApplicantWorkHistory] = useState("");

    const showApplicantProfile = async(applicant) => {
        const data = {
            userId: applicant.applicantId
        }
        const result = await axios.post("/getUserByID", data);
        console.log(result.data);
        setApplicantProfile(result.data);
        // setApplicantFirstName(result.data.firstName);
        // setApplicantLastName(result.data.lastName);
        // setApplicantProfile(result.data.profile);
        // setApplicantWorkHistory(result.data.workExperience);
       
    }

    const Applicants = () => {
        let applicants = location.state.applicants.map(applicant => (
            <li onClick={e => showApplicantProfile(applicant)} style={{ listStyleType: "none", border: "1px solid #d3d3d3", cursor: "pointer"}}>
                <div style={{width: "100%", backgroundColor: "#fffbf3", height: "15vh", display: "flex"}}>
                    <h1 style={{fontSize: 16, marginTop: 15, marginBottom: 0}}>{applicant.applicantId}</h1>
                </div>

            </li>
        ));
        return applicants;
    }

    const ShowWorkExperience = () => {

        let profile = applicantProfile.workExperience.map(item => (
            <div>
                <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginBottom: "5px"}}>{item.companyName}</h1>
                <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginBottom: "5px"}}>{item.title}</h1>

                <div style={{display: "flex"}}>
                    <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginBottom: "5px"}}>From: {item.fromMonth} {item.fromYear}</h1>
                    <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginLeft: "20px", marginBottom: "5px"}}>To: {item.toMonth} {item.toYear}</h1>
                </div>
                <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginBottom: "10px"}}>{item.location}</h1>
                <p style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500, margin: 0, marginBottom: "15px"}}>{item.jobExperience}</p>

                <hr/>
            </div>
        ));
        return profile;
    }

    return(
        <div style={{display: "flex"}}>
         <div style={{backgroundColor:"#fffbf3", width: "35%", height: "100vh", overflow: "auto"}}>
            <Applicants />
         </div>
        { applicantProfile ? 
            <div style={{width: "65%", padding: "0px 20px", height: "100vh", overflow: "auto"}}>
            <div style={{display:"flex"}}>
               <h1 style={{fontSize: 24, fontFamily: "Helvetica Neue", fontWeight: 600}}>{applicantProfile.firstName}</h1>
               <h1 style={{paddingLeft: "10px", fontSize: 24, fontFamily: "Helvetica Neue", fontWeight: 600}}>{applicantProfile.lastName}</h1>
            </div>
            <div>
                <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500}}>Email: {applicantProfile.email}</h1>
                <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500}}>LinkedIn: {applicantProfile.profile.linkedin}</h1>
               <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500}}>College: {applicantProfile.profile.collegeName}</h1>
               <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500}}>Degree: {applicantProfile.profile.degree}</h1>
               <h1 style={{fontSize: 16, fontFamily: "Helvetica Neue", fontWeight: 500}}>Major: {applicantProfile.profile.major}</h1>
           </div>
           <hr/>
           <div>
               <h1 style={{fontSize: 25, fontFamily: "Helvetica Neue", fontWeight: 500}}>Work Experience</h1>
               <ShowWorkExperience/>
           </div>
           
        </div>
        : null
        }
         
         
         </div>
    );
}

export default JobPost;
