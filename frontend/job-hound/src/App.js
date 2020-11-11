import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ApplicantDashboard from "./components/ApplicantDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import ApplicantProfile from "./components/ApplicantProfile";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/applicantDashboard" component={ApplicantDashboard} />
        <Route exact path="/companyDashboard" component={CompanyDashboard} />
        <Route exact path="/applicantProfile" component={ApplicantProfile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
    
  );
}

export default App;
