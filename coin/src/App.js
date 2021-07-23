import "./App.css";
import React from "react";

import { BrowserRouter, Switch, Route, Router } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Main from "./Pages/Main/Main";
import MyPage from "./Pages/MyPage/MyPage";
import SignUp from "./Pages/SignUp/SignUp";
import SendMail from "./Pages/Sendmail/Sendmail";
import FindPw from "./Pages/FindPw/FindPw";
import Quit from "./Pages/Quit/Quit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/sendmail" component={SendMail} />
        <Route path="/findpw" component={FindPw} />
        <Route path="/quit" component={Quit} />
      </BrowserRouter>
    </>
  );
}

export default App;
