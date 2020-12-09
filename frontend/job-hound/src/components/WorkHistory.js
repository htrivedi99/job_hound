import React, { Component } from "react";

class WorkHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            experienceList: [],
            companyName: "",
            title: "",
            location: "",
            jobExperience: "",
        }
    }

    addWorkExperience = () => {

    }

    updateCompanyInformation = (e, index) => {
        console.log(index);
        // if(info === "companyName"){
        //     const workHistory = this.state.experienceList;
        //     workHistory[i].companyName = e.target.value;
        //     this.setState({});
        //     setExperienceList(workHistory);
        // }else if(info === "title"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].title = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "location"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].location = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "jobExperience"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].jobExperience = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "fromMonth"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].fromMonth = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "fromYear"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].fromYear = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "toMonth"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].toMonth = e.target.value;
        //     setExperienceList(workHistory);
        // }else if(info === "toYear"){
        //     const workHistory = [...experienceList];
        //     workHistory[i].toYear = e.target.value;
        //     setExperienceList(workHistory);
        // }
       
    }
    render(){
        let testDisplay = this.props.workExperienceList.map((item, index) => (
        <React.Fragment>
        <div className="form-group">
                <input type="text" name="company-name" id="company-name" placeholder="Company Name" value={item.companyName} onChange={this.updateCompanyInformation(index)} />
                <input type="text" name="position" id="position" placeholder="Title" value={item.title} onChange={this.updateCompanyInformation(index)}/>
                <input type="text" name="location" id="location" placeholder="Location" value={item.location} onChange={this.updateCompanyInformation(index)}/>
                <div style={{display: "flex", alignItems: "center"}}>
                    <h1 style={{fontSize: 16, marginRight: 10}}>From</h1>
                    <select name="fromMonth" className="month-select" onChange={this.updateCompanyInformation(index)} value={item.fromMonth}>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                    </select>
                    <select name="fromYear" className="month-select" onChange={this.updateCompanyInformation(index)} value={item.fromYear}>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                    </select>
                    <h1 style={{fontSize: 16, marginRight: 10}}>To</h1>
                    <select name="toMonth" className="month-select" onChange={this.updateCompanyInformation(index)} value={item.toMonth}>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                    </select>
                    <select name="toYear" className="month-select" onChange={this.updateCompanyInformation(index)} value={item.toYear}>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                    </select>
                </div>
                <textarea style={{width: "100%", border: "1px solid #ccc", borderRadius: 5, fontFamily: "Helvetica Neue", fontSize: 18, padding: 10 }} 
                placeholder="Experience" 
                name="textArea"
                rows="7" 
                value={item.jobExperience}
                onChange={this.updateCompanyInformation(index)} 
                />
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button style={{backgroundColor: "#D2691E", padding: "10px 20px", fontSize: 20, borderRadius: "10px", color: "#fff", cursor: "pointer"}}>Save</button>
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
                        <h1 className="addWorkExperience-btn" onClick={this.addWorkExperience}>+ Add Another</h1>
                    </div>
                
                </div>
                {testDisplay}
            </div>
        
        );
    }
}

export default WorkHistory;