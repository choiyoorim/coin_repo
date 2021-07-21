import React, { Component } from "react";

class LoginContent extends Component {
  render() {
    return (
      <div className="content">
        <form>
          <input type="email" placeholder="email" />
          <br />

          <input type="password" placeholder="password" />

          <br />
          <button type="submit">Login</button>
          <br />
          <a>카카오톡으로 로그인하기</a>
          <br />
          <a target="_blank" id="pw-inquiry" href="#">
            비밀번호 찾기
          </a>
        </form>
      </div>
    );
  }
}

export default LoginContent;