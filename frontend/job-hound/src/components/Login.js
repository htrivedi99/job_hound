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

    const login = () => {
        const user = {
            email: inputs.email,
            password: inputs.password
        }
        axios.post("/applicantLogin", user)
        .then(res => {
            setUserId(res.data.userId);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
        })
        .then(res => {
            history.push("/applicantDashboard");
        })

        console.log(userId, firstName, lastName);

    }

    const {inputs, handleInputChange, handleSubmit} = CustomForm({email: '', password: ''}, login);
    return(
        <div id="register-container">
        <div class="form-wrap">
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