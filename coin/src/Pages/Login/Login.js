import React from "react";
import LoginHeader from "../Components/LoginHeader";
import LoginContent from "../Components/LoginContent";

class Login extends React.Component {
  render() {
    return (
      <div className="wrap-login">
        <LoginHeader />
        <LoginContent />
      </div>
    );
  }
}

export default Login;
