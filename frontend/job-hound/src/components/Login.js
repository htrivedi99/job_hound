import React from "react";
import CustomForm from "./profileForm.js";
import "../styles/Register.css";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import axios from "axios";


function Login() {

    const history = useHistory();

    const [userId, setUserId] = useLocalStorage("userId");
    const [firstName, setFirstName] = useLocalStorage("firstName");
    const [lastName, setLastName] = useLocalStorage("lastName");
    const [jobPosts, setJobPosts] = useLocalStorage("jobPosts");

    const login = async() => {
        const user = {
            email: inputs.email,
            password: inputs.password
        }

        const response = await axios.post("/applicantLogin", user)
        
        setUserId(response.data.userId);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        
        if(response.data.userType === "applicant"){
          history.push("/applicantDashboard");
        }else{
          setJobPosts(response.data.jobPosts);
          history.push("/recruiterDashboard");
        }

        console.log(userId, firstName, lastName);

    }

    const {inputs, handleInputChange, handleSubmit} = CustomForm({email: '', password: ''}, login);
    return(
        <div id="register-container">
        <div className="form-wrap">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={inputs.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={inputs.password} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn">LOGIN</button>
        </form>
      </div>
      </div>
    );

}
export default Login;