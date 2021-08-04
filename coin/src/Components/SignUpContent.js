import React, { Component } from "react";

class SignUpContent extends Component {
  state = {
    text: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onclick = () => {
    const textbox = {
      inText: this.state.text,
    };
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify(textbox),
    });
  };

  render() {
    return (
      <div className="content">
        <form id="content-signup">
          <label> 아이디 </label>
          <div id="id-input">
            <input class="input_id" required type="id" placeholder="id" />
          </div>
          <br />
          <label>이메일</label>
          <div id="email-input">
            <input class="input_email" required type="email" placeholder="email" />
            <button class="btn">중복 체크</button>
          </div>

          <br />
          <label>비밀번호</label>
          <input class="input_pwd" required type="password" placeholder="password" />
          <br />
          <label>비밀번호 재확인</label>
          <input class="input_repwd" required type="password" placeholder="confirmPassword" />
          <br />
          <label>닉네임</label>
          <input class="input_nick"required type="text" placeholder="nickname" />

          <br />
          <button class="btn" type="submit" onClick={this.onclick}>Sign Up</button>
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