import React from "react";
import { createGlobalStyle } from "styled-components";
import InfoTemplate from "../../Components/InfoTemplate";
import ProfilePic from "../../Components/ProfilePic";
import Profile from "../../Components/Profile";
import InfoChangeTemplate from "../../Components/InfoChangeTemplate";
import TextInput from "../../Components/TextInput";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const GlobalStyle = createGlobalStyle`
    body{
        background: #cfdce8;
    }
    h2{
        width:500px;
        color:#354356;
        position:relative;
        top:20px;
        left:80px;
    }
    #editpw-box{
        position:relative;
        top:70px;
    }
    .last-box{
        margin-bottom:60px;
    }
    .check-box{
        float:right;
        position:relative;
        right:85px;
        bottom:20px;
    }
    #email-box{
        position:relative;
        top:70px;
    }
    #last-box{
        position:relative;
        top:70px;
    }
    h3{
        float:right;
        position:relative;
        right:80px;
        bottom:43px;
    }
    .withdraw-button{
        width:100px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        position:relative;
        float:right;
        top:10px;
        left:18px;
        font-size:15px;
    }
    .withdraw-button:hover{
        background-color:#6C8BA7;
    }
    .editpw-button{
        width:130px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        position:relative;
        float:right;
        right:75px;
        top:20px;
        font-size:15px;
    }
    .editpw-button:hover{
        background-color:#6C8BA7;
    }
    .editprofile-button{
        width:130px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        font-size:15px;
        position:relative;
        right:75px;
        top:20px;
        float:right;
    }
    .editprofile-button:hover{
        background-color:#6c8ba7;
    }
    #check-block{
        position:relative;
        top:40px;
    }
`;

function MyPage() {
  return (
    <>
      <GlobalStyle />
      <InfoTemplate>
        <ProfilePic />
        <Profile />
      </InfoTemplate>
      <InfoChangeTemplate>
        <h2>연동계정 1</h2>
        <TextInput init={"사용자1"} />
        <h2>연동계정 2</h2>
        <TextInput init={"사용자2"} />
        <h2>연동계정 3</h2>
        <TextInput init={"사용자3"} />
        <h2>회원 닉네임</h2>
        <TextInput init={"닉네임"} />
        <button className="editprofile-button">수정사항 저장</button>
        <h2 id="editpw-box">비밀번호 수정</h2>
        <Link to="/sendmail">
          <button className="editpw-button">비밀번호 수정</button>
        </Link>
        <h2 id="email-box">이메일 수신 동의 여부</h2>
        <div id="check-block">
          <h3>동의합니다</h3>
          <input className="check-box" type="checkbox"></input>
        </div>
        <h2 id="last-box">탈퇴하기</h2>
        <Link to="/quit">
          <button className="withdraw-button">탈퇴하기</button>
        </Link>
      </InfoChangeTemplate>
    </>
  );
}

export default MyPage;
