import React from "react";
import LoginHeader from "../../Components/LoginHeader";
import LoginContent from "../../Components/LoginContent";
import { withRouter } from "react-router-dom";
import './Login.css'

function Login({history}) {
    return (
      <div className="wrap-login">
        <LoginHeader />
        <LoginContent />
      </div>
    );
  }


export default Login;
