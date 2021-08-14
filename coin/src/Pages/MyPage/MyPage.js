import React,{useState,useEffect} from "react";
import { createGlobalStyle } from "styled-components";
import InfoTemplate from "../../Components/InfoTemplate";
import ProfilePic from "../../Components/ProfilePic";
import Profile from "../../Components/Profile";
import InfoChangeTemplate from "../../Components/InfoChangeTemplate";
import TextInput from "../../Components/TextInput";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useReducer } from "react";
//회원정보 가져오는데 사용할 것
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { getUserinfo } from "../../action/userAction";
import axios from "axios";
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body{
        background: #cfdce8;
    }
    .profileForm{
      justify-content: center;
      align-items: center;
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
    
    #check-block{
        position:relative;
        top:40px;
    }
    .go-to-main{
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
      top:200px;
      left: 8px;
      }

    .go-to-main:hover{
      background-color:#6C8BA7;
  }
    .editprofile-button1{
        width:100px;
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
        bottom:30px;
        float:right;
    }

    .editprofile-button1:hover{
      background-color:#6C8BA7;
  }

  .editprofile-button2{
    width:100px;
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
    bottom:30px;
    float:right;
}

  .editprofile-button2:hover{
    background-color:#6C8BA7;
  }

  .editprofile-button3{
    width:100px;
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
    bottom:30px;
    float:right;
  }

  .editprofile-button3:hover{
  background-color:#6C8BA7;
  }

  .editprofile-button4{
    width:100px;
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
    bottom:30px;
    float:right;
  }

  .editprofile-button4:hover{
  background-color:#6C8BA7;
  }

`;

const TextBlock = styled.div`
    width:720px;
    height:40px;

    position:relative;
    left: 90px;
    top:20px;
    background: #cfdce8;
    border-radius: 20px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);
    margin-bottom:20px;
    padding-top:10px;
    padding-left:20px;
    .text-box{
        position:relative;
        left:20px;
        top:10px;
    }

    .editprofile-button4{
      width:100px;
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
      bottom:30px;
      float:right;
  }

  .editprofile-button4:hover{
    background-color:#6C8BA7;
}
`;
function MyPage () {
  const [Email, setEmail] = useState("")
  const [Nickname, setNickname] = useState("")
  const [state,setState] = useState("")
  const {id} = useSelector(state=>({
        id : state.user.Id,
  }))
  
  if({id}.id!=undefined){
    console.log({id});
  }

  useEffect(() => {
    if({id}.id!=undefined){
      let body = {
        id:{id}.id,
      }
      console.log(body);
      console.log(state);
      axios({
        method: 'post',
        url: '/api/userinfo',
        data: {
          id:body.id
        }
      }).then(function (response) {
        console.log(response);
        if(response.data.success){
          console.log("되는거니..?")
          setEmail(response.data.email);
          setNickname(response.data.nickname);
        }    
        setState("pass")    
      });

    }
  }, [state]);
  
  
  if(state==="pass"){
    return (
      <>
        <GlobalStyle />
        <div class="profileForm">
        <InfoTemplate>
          <ProfilePic />
          <Profile />
        </InfoTemplate>
        <InfoChangeTemplate>
          <h2>GIT 계정</h2> 
          <button className="editprofile-button1">수정하기</button>
          <TextBlock>사용자1</TextBlock>
          <h2>BAEKJOON 계정</h2>
          <button className="editprofile-button2">수정하기</button>
          <TextBlock>사용자2</TextBlock>
          <h2>이메일</h2>
          <button className="editprofile-button3">수정하기</button>
          <TextBlock>{Email}</TextBlock>
          <h2>닉네임</h2>
          <button className="editprofile-button4">수정하기</button>
          <TextBlock>{Nickname}</TextBlock>

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
        </div>
      </>
    );
  }
  else{
    return(
      <>
        <h1>loading중</h1>
      </>
    );
    
  }
}

export default MyPage;
