import "./FindPw.css"
import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { withRouter } from "react-router";

class FindPw extends Component{
    render(){
        function sendEmail(e) {
            e.preventDefault();
        
            emailjs.sendForm('service_7h3fwfo', 'template_8ihmbep', e.target, 'user_fN9Q35LNCvyrG2p2uRUDc')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
          }
        return(
            <div class="Findpw">
                <h1 class = "email_h1">이메일 입력</h1>
                <div class="findpw">
                    <form onSubmit={sendEmail}>
                        <input type="email" name="user_email" class="email_input" placeholder="email" />
                        <h3 class = "email_h3">유효하지 않은 이메일은 보내지지 않습니다.</h3>
                        <button type='submit' class = "btn3">이메일 전송하기</button>
                    </form>
                </div>
                <br/>
                <br/>
                <a class="linkFindK" href="#">카카오톡에서 비밀번호 찾기</a>
            </div>
        );
    }
}

export default FindPw;