import React from "react";
import LoginHeader from "../../Components/LoginHeader";
import SignUpContent from "../../Components/SignUpContent";
import './SignUp.css'

class SignUp extends React.Component {
  render() {
    return (
      <div className="wrap-login">
        <LoginHeader />
        <SignUpContent />
      </div>
    );
  }
}

export default SignUp;