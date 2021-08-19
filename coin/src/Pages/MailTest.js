import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import $ from "jquery";

class MailTest extends Component {
  render() {
    //버튼 자동 클릭
    $(document).ready(function () {
      $("#btn_commit_count_zero").trigger("click");
    });

    const sendEmail = (e) => {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_lk8v48q",
          "template_h0mno5s",
          e.target,
          "user_QPFfIPDj4JDhNVowBVG6S"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    };

    const today = new Date(); //오늘 날짜 + 시간 받아오기
    let hours = today.getHours(); // 시
    function numberPad(n, width) {
      //만약 분이 한자리 수라면 0 붙여주기 위한 함수
      n = n + "";
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join("0") + n;
    }
    let minutes = today.getMinutes(); //분
    hours = numberPad(hours, 2); //시간이 한자리 수라면 0 붙이기
    minutes = numberPad(minutes, 2); //분이 한자리 수라면 0 붙이기
    let checktime_now = hours.toString() + minutes.toString(); //현재 시간 string 타입으로 저장

    return (
      <div>
        {checktime_now == "1800" ? (
          <form class="findpw" onSubmit={sendEmail}>
            <input
              type="hidden"
              name="user_email"
              class="email_input"
              value="jeesoo0908@gmail.com"
            />
            <br />
            <button
              class="btn_commit_count_zero"
              id="btn_commit_count_zero"
              style={{
                width: 0,
                height: 0,
                backgroundColor: "white",
                borderStyle: "none",
              }}
            ></button>
          </form>
        ) : null}
      </div>
    );
  }
}

export default MailTest;
