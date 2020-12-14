import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import CustomForm from "./profileForm.js";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import "../styles/ApplicantProfile.css";
import axios from "axios";

function WorkHistory({ callback, workExperienceList}) {

    let [experienceList, setExperienceList] = useState(workExperienceList);
    let [companyName, setCompanyName] = useState("");
    let [title, setTitle] = useState("");
    let [location, setLocation] = useState("");
    let [jobExperience, setJobExperience] = useState("");
    const [dropdownInputs, setDropdownInputs] = useState({});

    let experiences = [
        {
            companyName: "",
            title: "",
            location: "",
            fromMonth: "January",
            fromYear: "2010",
            toMonth: "January",
            toYear: "2010",
            jobExperience: ""
        }
    ]
    useEffect(() => {
       setExperienceList(workExperienceList);
    }, [workExperienceList]);
   
    
    function addWorkExperience(){
        let experincePlaceholder = {
            companyName: "",
            title: "",
            location: "",
            fromMonth: "January",
            fromYear: "2010",
            toMonth: "January",
            toYear: "2010",
            jobExperience: ""
        }
        setExperienceList([experincePlaceholder, ...experienceList]);
        //callback(experienceList);
        setCompanyName("");
        setTitle("");
        setLocation("");
        setJobExperience("");  
    }

    const saveWorkExperience = (event) => {
        event.preventDefault();
        callback(experienceList);
    }

    function updateCompanyInformation(e, i, info) {
        if(info === "companyName"){
            const workHistory = [...experienceList];
            workHistory[i].companyName = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "title"){
            const workHistory = [...experienceList];
            workHistory[i].title = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "location"){
            const workHistory = [...experienceList];
            workHistory[i].location = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "jobExperience"){
            const workHistory = [...experienceList];
            workHistory[i].jobExperience = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "fromMonth"){
            const workHistory = [...experienceList];
            workHistory[i].fromMonth = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "fromYear"){
            const workHistory = [...experienceList];
            workHistory[i].fromYear = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "toMonth"){
            const workHistory = [...experienceList];
            workHistory[i].toMonth = e.target.value;
            setExperienceList(workHistory);
        }else if(info === "toYear"){
            const workHistory = [...experienceList];
            workHistory[i].toYear = e.target.value;
            setExperienceList(workHistory);
        }
       
    }

    const handleDropdownChange = (event) => {
        event.persist();
        setDropdownInputs(dropdownInputs => ({...dropdownInputs, [event.target.name]: event.target.value}));
        console.log(dropdownInputs);
    }

    let testDisplay = experienceList.map((item, index) => (
        <React.Fragment>
        <div className="form-group">
                <input type="text" name="company-name" id="company-name" placeholder="Company Name" value={item.companyName} onChange={e => updateCompanyInformation(e, index, "companyName")} />
                <input type="text" name="position" id="position" placeholder="Title" value={item.title} onChange={e => updateCompanyInformation(e, index, "title")}/>
                <input type="text" name="location" id="location" placeholder="Location" value={item.location} onChange={e => updateCompanyInformation(e, index, "location")}/>
                <div style={{display: "flex", alignItems: "center"}}>
                    <h1 style={{fontSize: 16, marginRight: 10}}>From</h1>
                    <select name="fromMonth" className="month-select" onChange={e => updateCompanyInformation(e, index, "fromMonth")} value={item.fromMonth}>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                    </select>
                    <select name="fromYear" className="month-select" onChange={e => updateCompanyInformation(e, index, "fromYear")} value={item.fromYear}>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                    </select>
                    <h1 style={{fontSize: 16, marginRight: 10}}>To</h1>
                    <select name="toMonth" className="month-select" onChange={e => updateCompanyInformation(e, index, "toMonth")} value={item.toMonth}>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                    </select>
                    <select name="toYear" className="month-select" onChange={e => updateCompanyInformation(e, index, "toYear")} value={item.toYear}>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                    </select>
                </div>
                <textarea style={{width: "100%", border: "1px solid #ccc", borderRadius: 5, fontFamily: "Helvetica Neue", fontSize: 18, padding: 10 }} 
                placeholder="Experience" 
                rows="7" 
                value={item.jobExperience}
                onChange={e => updateCompanyInformation(e, index, "jobExperience")} 
                />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button onClick={saveWorkExperience} style={{backgroundColor: "#D2691E", padding: "10px 20px", fontSize: 20, borderRadius: "10px", color: "#fff", cursor: "pointer"}}>Save</button>
                    <button style={{backgroundColor: "#B22222", padding: "10px 20px", fontSize: 20, borderRadius: "10px", color: "#fff", cursor: "pointer"}}>Trash</button>
                </div>


            </div>
            <br/>
            <br/>

            </React.Fragment>
    ));

    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1 style={{color: "#666", fontSize: "18px"}}>Work Experience</h1>
                <div>
                <h1 className="addWorkExperience-btn" onClick={addWorkExperience}>+ Add Another</h1>
                </div>
                
            </div>
            
            {testDisplay}
            
        </div>
        

    );
};

function ApplicantProfile(){

    const [userId, setUserId] = useLocalStorage("userId");
    const [profileData, setProfileData] = useState({firstName: '', lastName: '', email: '', profile: {}, workExperience: []});
    const [workExperience, setWorkExperience] = useState([]);
    const history = useHistory();
    

    const getUserData = async() => {
        const users = await axios.post("/getUserByID", {"userId":userId});
        setProfileData(users.data);
    }

    useEffect(() => {
        document.body.style = 'background: #fffbf3;'; 
        // getUserData();
        const fetchData = async() => {
            const result = await axios.post("/getUserByID", {"userId":userId});
            setProfileData(result.data);
            setWorkExperience(result.data.workExperience);
        };
        fetchData();

    }, []);
   
    
    const [resume, setResume] = useState("");

    const saveProfile = async (event) => {
        if(event){
            event.preventDefault();
        }
        console.log("Profile clicked");
        const formData = new FormData();
        formData.append("file", resume);
        let resumeUrl = "";
        console.log(profileData.profile);
        console.log(workExperience);
        

        if(resume !== ""){
            await axios.post("/uploadResumeToS3", formData)
            .then(res => {
                console.log(res);
                resumeUrl = res.data;
            })
        }
        let profileInfo = {};
        if(resume !== ""){
            profileInfo = {
                userInfo: profileData.profile,
                workExperience: workExperience,
                userId: userId,
                resumeUrl: resumeUrl
            }
        }else{
            profileInfo = {
                userInfo: profileData.profile,
                workExperience: workExperience,
                userId: userId
            }

        }
        
        await axios.post("/updateApplicantProfile", profileInfo)
        .then(res => {
            console.log(res);
            history.push("/applicantDashboard");
            
        }) 

    }

    // const {inputs, handleInputChange, handleSubmit} = CustomForm({firstName: profileData.firstName, lastName: '', email: '', linkedin: '', collegeName: '', major: '', degree: ''}, saveProfile);

    
   
    
    const getWorkExperience = (experience) => {
        console.log(experience);
        setWorkExperience(experience);
    }

    const handleFileUpload = (event) => {
        console.log(event.target.files[0]);
        let resume = event.target.files[0];
        //let resumeURL = URL.createObjectURL(resume);
        setResume(resume);
    }

    const handleNestedStateChange = (event) => {
        setProfileData({...profileData, profile:{
            ...profileData.profile,
            [event.target.name]: event.target.value}
        });
    }

    return(
        <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
            <div className="container">
                <form>
                <h1>Profile Info</h1>
                <hr/>
                <div style={{display:"flex", width:"100%"}}>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input style={{width: "95%"}} type="text" name="firstName" id="first-name" onChange={handleNestedStateChange} value={profileData.profile.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">Last Name</label>
                        <input type="text" name="lastName" id="last-name" onChange={handleNestedStateChange} value={profileData.profile.lastName}/>
                    </div>
                    
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" onChange={handleNestedStateChange} value={profileData.profile.email} />
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="linkedin">Linkedin Profile URL</label>
                    <input type="text" name="linkedin" id="linkedin" onChange={handleNestedStateChange} value={profileData.profile.linkedin} />
                </div>
                <div style={{marginTop: 20}}>
                    <input type="file" name="file" id="file" className="inputfile" onChange={handleFileUpload} />
                    <label htmlFor="file">Upload Resume</label>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="collegename">University Name</label>
                    <input type="text" name="collegeName" id="collegename" onChange={handleNestedStateChange} value={profileData.profile.collegeName}/>
                </div>
                <br/>
                <div style={{display:"flex", width:"100%"}}>
                    <div className="form-group">
                        <label htmlFor="college-major">Major</label>
                        <input style={{width: "95%"}} type="text" name="major" id="college-major" onChange={handleNestedStateChange} value={profileData.profile.major}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="college-degree">Degree</label>
                        <input type="text" name="degree" id="college-degree" onChange={handleNestedStateChange} value={profileData.profile.degree}/>
                    </div>
                    
                </div>
                <br/>
                <WorkHistory callback={getWorkExperience} workExperienceList={profileData.workExperience} />
                <div className="profile-save-btn" onClick={saveProfile}>
                    <h1 style={{fontSize: "18px", color: "#fff"}}>Save Profile</h1>
                </div>
               
                <br/>
                <br/>
                <br/>
                <br/>

                
                </form>
            </div>
        </div>
        
    );
}

export default ApplicantProfile;
