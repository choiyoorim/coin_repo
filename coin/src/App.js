import "./App.css";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "./action/userAction";
import { withRouter } from "react-router";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Main from "./Pages/Main/Main";
import MyPage from "./Pages/MyPage/MyPage";
import SignUp from "./Pages/SignUp/SignUp";
import SendMail from "./Pages/Sendmail/Sendmail";
import FindPw from "./Pages/FindPw/FindPw";
import Quit from "./Pages/Quit/Quit";
import Auth from "./hoc/auth";

function App() {
  //창닫으면 로그아웃 기능
  const dispatch = useDispatch();

  window.addEventListener("unload", function (e) {
    dispatch(logoutUser()).then((res) => {}); //Webkit, Safari, Chrome
  });

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route path="/login" component={Auth(Login, false)} />
          <Route path="/main" component={Auth(Main, true)} />
          <Route path="/mypage" component={Auth(MyPage, true)} />
          <Route path="/signup" component={Auth(SignUp, false)} />
          <Route path="/sendmail" component={Auth(SendMail, null)} />
          <Route path="/findpw" component={Auth(FindPw, null)} />
          <Route path="/quit" component={Auth(Quit, true)} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
