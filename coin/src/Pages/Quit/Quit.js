import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { createBrowserHistory } from "history";
import LoginHeader from "../../Components/LoginHeader";

const BrowserHistory = createBrowserHistory();

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #cfdce8;
    color: #354356;
  }

  .wrap-quit{
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      width:100%;
      height:100vh;
  }
  .wrap-quit > label{
      font-size:15px;
  }

  .quitButton{
      background-color:#6C8BA7;
      color:#F9FBFD;
      border:0;
      outline:0;
      width: 320px;
      height:30px;
      border-radius:8px;
  }

  .quitButton:hover{
    background-color:#F9FBFD;
    color:#354356;
  }
`;

class Quit extends Component {
  render() {
    function quitButtonHandler(e) {
      // 여기서 비밀번호 맞는지 확인하고 맞으면 alert로 넘어가기 틀리면 alert로 비밀번호 틀렸다고 알려주기
      alert("탈퇴되었습니다.");
      BrowserHistory.push("/");
    }
    return (
      <div className="wrap-quit">
        <LoginHeader />
        <GlobalStyle />

        <form onSubmit={quitButtonHandler}>
          <label style={{ fontSize: 18, lineHeight: 1.7 }}>탈퇴하기</label>
          <label>비밀번호 확인</label>
          <input
            required
            className="input_pwd"
            type="password"
            placeholder="password"
          />
          <p>탈퇴 시 유의사항 안내</p>
          <button className="quitButton" type="submit">
            탈퇴하기
          </button>
        </form>
      </div>
    );
  }
}

export default Quit;
