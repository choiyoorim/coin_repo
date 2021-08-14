import React, { Component } from "react";
import { Link } from "react-router-dom";
class LoginContent extends Component {
  render() {
    return (
      <div className="content">
        <form class="loginContent">
          <input required className="input_id" type="id" placeholder="id" />
          <br />
          <input
            required
            className="input_pwd"
            type="password"
            placeholder="password"
          />
          <br />
          <button className="btn" type="submit">
            Login
          </button>
          <br />
          <a target="_blank" id="pw-inquiry" href="#">
            <Link to="signup">회원가입</Link> |{" "}
            <Link to="findpw">비밀번호 찾기</Link>
          </a>
        </form>
      </div>
    );
  }
}

export default LoginContent;
