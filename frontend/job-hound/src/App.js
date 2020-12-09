import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ApplicantDashboard from "./components/ApplicantDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import ApplicantProfile from "./components/ApplicantProfile";
import Register from "./components/Register";
import Login from "./components/Login";
import CompanyRegister from "./components/CompanyRegister";
import RecruiterDashboard from './components/RecruiterDashboard';
import NewJobPostForm from './components/NewJobPostForm';
import JobPost from './components/JobPost';


function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/applicantDashboard" component={ApplicantDashboard} />
        <Route exact path="/companyDashboard" component={CompanyDashboard} />
        <Route exact path="/applicantProfile" component={ApplicantProfile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/companyRegister" component={CompanyRegister} />
        <Route exact path="/recruiterDashboard" component={RecruiterDashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/newJobPostForm" component={NewJobPostForm} />
        <Route exact path="/jobPostById" component={JobPost} />
        
      </Router>
    </div>
    
  );
}

export default App;
