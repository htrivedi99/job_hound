import React from "react";
import "../styles/Home.css";
import { useHistory } from 'react-router-dom';

function Home(){
    const history = useHistory();

    return(
        <div style={{justifyContent: "center", alignItems: "center", display: "block", padding: "20px 20px", textAlign: "center"}}>
            <div onClick={() => history.push("/login")} style={{width: "30%", height: "10vh", backgroundColor: "#2E8B57", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", margin: "auto", cursor: "pointer"}}>
                <h1 style={{color:"#fff"}}>Login</h1>
            </div>
            <br/>
            <br/>
            <div onClick={() => history.push("/register")} style={{width: "30%", height: "10vh", backgroundColor: "#4682B4", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", margin: "auto", cursor: "pointer"}}>
                <h1 style={{color:"#fff"}}>Sign Up as an Applicant</h1>
            </div>
            <br />
            <br />
            <div onClick={() => history.push("/companyRegister")} style={{width: "30%", height: "10vh", backgroundColor: "#B22222", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", margin: "auto", cursor: "pointer"}}>
                <h1 style={{color:"#fff"}}>Sign Up as a Company</h1>
            </div>
        </div>
    );
}

export default Home;