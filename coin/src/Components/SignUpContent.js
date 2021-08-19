import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { registerUser } from "../action/userAction";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
function SignUpContent({ history }) {
  const [Id, setId] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password == ConfirmPassword) {
      let body = {
        id: Id,
        email: Email,
        password: Password,
        nickname: Nickname,
      };
      dispatch(registerUser(body)).then((res) => {
        if (res.payload.success) {
          alert("가입이 정상적으로 완료되었습니다");
          history.push("/login");
        } else {
          alert("가입이 불가합니다");
        }
      });
    } else {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };

  return (
    <div className="content">
      <form id="content-signup" onSubmit={onSubmitHandler}>
        <label>ID</label>
        <div id="id-input">
          <input
            class="input_id"
            required
            type="text"
            placeholder="id"
            onChange={onIdHandler}
          />
          <button class="btn">중복 체크</button>
        </div>

        <br />
        <label>이메일</label>
        <div id="email-input">
          <input
            class="input_email"
            required
            type="email"
            placeholder="email"
            onChange={onEmailHandler}
          />
          <button class="btn">중복 체크</button>
        </div>

        <br />
        <label>비밀번호</label>
        <input
          class="input_pwd"
          required
          type="password"
          placeholder="password"
          onChange={onPasswordHandler}
        />

        <br />
        <label>비밀번호 재확인</label>
        <input
          class="input_repwd"
          required
          type="password"
          placeholder="confirmPassword"
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <label>닉네임</label>
        <input
          class="input_nick"
          required
          type="text"
          placeholder="nickname"
          onChange={onNicknameHandler}
        />

        <br />
        <button class="btn" type="submit">
          Sign Up
        </button>
        <br />
        <a target="_blank" id="kakao-login" href="#">
          카카오톡으로 가입하기
        </a>
      </form>
    </div>
  );
}

export default withRouter(SignUpContent);
