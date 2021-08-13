import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import emailjs from 'emailjs-com';
import $ from "jquery";
//window.$ = window.jquery = jquery;

class MailTest extends Component{
    render(){
        //버튼 자동 클릭
        $(document).ready(function(){
            $("#btn_commit_count_zero").trigger('click');
            });

        function sendEmail(e) {
            e.preventDefault();
            //sendForm 숨겨야 되는데 까먹음
            emailjs.sendForm('service_7h3fwfo', 'template_ex2u9sb', e.target, 'user_fN9Q35LNCvyrG2p2uRUDc')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
          }

            const today = new Date(); //오늘 날짜 + 시간 받아오기
            let hours = today.getHours(); // 시
            function numberPad(n, width) { //만약 분이 한자리 수라면 0 붙여주기 위한 함수
                n = n + '';
                return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
            }
            let minutes = today.getMinutes(); //분 
            minutes = numberPad(minutes, 2); //분이 한자리 수라면 0 붙이기
            let checktime_now = hours.toString() + minutes.toString(); //현재 시간 string 타입으로 저장
            console.log(checktime_now);
            
        return(
            //조건문으로 만약 사용자(얘 db에서 불러오기)의 커밋 개수가 오후 6시(=18시)까지 커밋 개수가 0개라면
            <div>
                {
                    checktime_now == "1215" // 가장 위의 조건문을 사용자를 불러와서 이 사람의 커밋 수가 0인지 먼저 체크 (사용자 id.commit count == 0 ? checktime_now == ~)
                    ?
                    <form class = "findpw" onSubmit={sendEmail}>
                    <input type="hidden" name="user_email" class="email_input" value="jeesoo0908@gmail.com" />
                        <br /> 
                        <button class = "btn_commit_count_zero" id="btn_commit_count_zero" sytle="display:none;">이메일 전송하기</button>
                    </form>
                    :
                    null
                }
                
            </div>
        );
        //input 내부의 value에 사용자 id와 대조해서 사용자 email 가져오기 + 버튼 없애기
    }
}

export default MailTest;