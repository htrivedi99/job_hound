import React from "react";
import CustomForm from "./profileForm.js";
import "../styles/Register.css";
import {useLocalStorage} from "./localStorage.js";
import { useHistory } from 'react-router-dom';
import axios from "axios";


function Register() {

    const history = useHistory();
    const [userId, setUserId] = useLocalStorage("userId");

    const createAccount = () => {
       if(inputs.password === inputs.confirmPassword){
        const newUser = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            password: inputs.password
        }
        
        axios.post("/newJobApplicant", newUser)
        .then(res => {
            if(res.status === 200){
                let docId = res.data.documentId;
                setUserId(docId);
                history.push("/applicantDashboard");
            }
        })
       }
    }

    const {inputs, handleInputChange, handleSubmit} = CustomForm({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}, createAccount);

    return(
        <div id="register-container">
        <div class="form-wrap">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" name="firstName" id="first-name" value={inputs.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" name="lastName" id="last-name" value={inputs.lastName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={inputs.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={inputs.password} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={inputs.confirmPassword} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn">Sign Up</button>
          <p className="bottom-text">
            By clicking the Sign Up button, you agree to our
            <a href="#">Terms & Conditions</a> and
            <a href="#">Privacy Policy</a>
          </p>
        </form>
      </div>
      </div>
    );
}

export default Register;