import React, {Component,useState} from "react";
import './Sendmail.css';
import axios from "axios";
import { useSelector } from "react-redux";
import LoginHeader from "../../Components/LoginHeader";

function Sendmail(){
    const {id} = useSelector(state=>({
        id : state.user.Id,
    }))
    const [Password,setPassword] = useState("");
    const [ConfirmPassword,setConfirmPassword] = useState("");
    
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onChangePassword = (event) =>{
        event.preventDefault();
        if(Password==ConfirmPassword){
            axios({
                method:'post',
                url:'/api/pwchange',
                data:{
                    id:id,
                    password:Password,
                }
            }).then((res)=>{
                if(res.data.success){
                    alert('수정 완료')
                }
                else{
                    console.log('오류')
                }
            })
        }
    }
    return(
        <div class = "Sendmail">
            <LoginHeader></LoginHeader>
            <form class = "confirm" onSubmit={onChangePassword}>
                <div>
                    <b>새로운 비밀번호</b> &nbsp; &nbsp; 
                    <input type="password" placeholder="Password" id="password1" class = "pw1_input" onChange={onPasswordHandler}/>
                    <br/>
                </div>
                <br /><br /><br />
                <div>
                    <b>비밀번호 재확인</b> &nbsp; &nbsp; 
                    <input type="password" placeholder="Confirm Password" id = "password2" class = "pw2_input" onChange={onConfirmPasswordHandler}/>
                    <br />
                </div>
                <br /><br />
                <button type ="submit" name = "pwConfirm" class = "btn2" align = 'right'>확인</button>
            </form>
        </div>
    )
}

export default Sendmail;