import React, { Component, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { createBrowserHistory } from "history";
import LoginHeader from "../../Components/LoginHeader";
import { withRouter } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";


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

function Quit({history}) {
  const {id} = useSelector(state=>({
    id : state.user.Id,
  }))
  const [password,setPassword] = useState("");
  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value);
  }

  const quitButtonHandler = (event) => {
    // 여기서 비밀번호 맞는지 확인하고 맞으면 alert로 넘어가기 틀리면 alert로 비밀번호 틀렸다고 알려주기
    event.preventDefault();
    axios({
      method:'post',
      url:'/api/pwcheck',
      data:{
          id:id,
          password:password,
      }
  }).then((res)=>{
        if(res.data.success){
            axios({
              method:'post',
              url:'/api/quit',
              data:{
                id:id
              }
            }).then((res)=>{
              if(res.data.success){
                alert("탈퇴되었습니다.");
                history.push('/');
              }
              else{
                alert('탈퇴 처리 중 오류가 발생했습니다.')
              }
            })
            
        }
        else{
            alert(res.data.message)
        }
    })
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
          onChange={onPasswordHandler}
        />
        <p>탈퇴 시 유의사항 안내</p>
        <button className="quitButton" type="submit">
          탈퇴하기
        </button>
      </form>
    </div>
  );
}


export default withRouter(Quit);
