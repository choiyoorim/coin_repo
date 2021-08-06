import React,{useEffect} from "react";
import LoginHeader from "../../Components/LoginHeader";
import SignUpContent from "../../Components/SignUpContent";
import './SignUp.css'
import axios from "axios";
import { withRouter } from "react-router";

function SignUp(){
  
    return (
      <div className="wrap-login">
        <LoginHeader />
        <SignUpContent />
      </div>
    );
}


export default SignUp;