import React, { Component } from "react";

class SignUpContent extends Component {
  render() {
    return (
      <div className="content">
        <form id="content-signup">
          <label>이메일</label>
          <div id="email-input">
            <input required type="email" placeholder="email" />
            <button>중복 체크</button>
          </div>

          <br />
          <label>비밀번호</label>
          <input required type="password" placeholder="password" />
          <br />
          <label>비밀번호 재확인</label>
          <input required type="password" placeholder="confirmPassword" />
          <br />
          <label>닉네임</label>
          <input required type="text" placeholder="nickname" />

          <br />
          <button type="submit">Sign Up</button>
          <br />
          <a target="_blank" id="kakao-login" href="#">
            카카오톡으로 가입하기
          </a>
        </form>
      </div>
    );
  }
}

export default SignUpContent;