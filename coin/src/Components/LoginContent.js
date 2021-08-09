import React, { Component,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { loginUser } from "../action/userAction";
import {useDispatch} from 'react-redux';
import 'react-router-dom';
import { withRouter } from "react-router";

function LoginContent({history}) {
  const [Id,setId] = useState("")
  const [Password,setPassword] = useState("")
  const dispatch = useDispatch();

  const onIdHandler = (event) =>{
    setId(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    let body = {
      id : Id,
      password : Password
    };

    dispatch(loginUser(body))
      .then((res) => {
        if (res.payload.loginSuccess) {
          alert("login 성공");
          history.push('/main')
        } else {
          alert(res.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };





  return (
    <div className="content">
      <form class = "loginContent" onSubmit={onSubmitHandler}>
        <input className="input_id" type="id" placeholder="id" onChange={onIdHandler}/>
        <br />

        <input className="input_pwd" type="password" placeholder="password" onChange={onPasswordHandler}/>

        <br />
        <button className="btn" type="submit">Login</button>
      </form>  

        <br />
        <a>카카오톡으로 로그인하기</a>
        <br />
        <a target="_blank" id="pw-inquiry" href="#">
        <Link to="signup">회원가입</Link> | <Link to="findpw">비밀번호 찾기</Link>
        </a>

    </div>
  );
}


export default withRouter(LoginContent);