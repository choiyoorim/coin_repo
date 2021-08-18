import "./FindPw.css"
import React, { Component,useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import ProfilePic from "../../Components/ProfilePic";
import {Link} from 'react-router-dom'
import Sendmail from "../Sendmail/Sendmail";
import { withRouter } from "react-router";
function FindPw({history}){
    const [Id,setId] = useState("");
    const [Email,setEmail] = useState("");

    const onIdHandler = (event) =>{
        setId(event.currentTarget.value);
    }

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }
    
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        axios({
            method:'post',
            url:'/api/findpw',
            data:{
                id:Id,
                email:Email
            }
        }).then(function(response){
            console.log(response);
            if(response.data.success){
                history.push({
                    pathname:'/sendmail',
                    state:{newid:Id}}
                );
            }
        })

    }
    return(
        <div class="Findpw">
            <h1 class = "email_h1">이메일 입력</h1>
            <div>
                <form class = "findpw" onSubmit={onSubmitHandler}>
                    <input type="email" name="user_email" class="email_input" placeholder="email" onChange={onEmailHandler}/>
                    <br />
                    <input type="id" name="user_id" class="id_input" placeholder="id" onChange={onIdHandler}/>
                    <br />
                    <button type='submit' class = "btn3">비밀번호 재설정</button>
                </form>
            </div>
            <br/>
            <br/>
            <a class="linkFindK" href="#">카카오톡에서 비밀번호 찾기</a>
        </div>
    );
}


export default withRouter(FindPw);