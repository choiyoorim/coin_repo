import "./App.css";
<<<<<<< HEAD
import React from "react";
import axios from "axios"

=======
import React, {useState} from "react";
>>>>>>> feature/issue-#10-github
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Main from "./Pages/Main/Main";
import MyPage from "./Pages/MyPage/MyPage";
import SignUp from "./Pages/SignUp/SignUp";
import SendMail from "./Pages/Sendmail/Sendmail";
import FindPw from "./Pages/FindPw/FindPw";
import Quit from "./Pages/Quit/Quit";
import Auth from './hoc/auth';
import GithubTest from "./Pages/GithubTest";

function App() {
  return (
    <>
      <BrowserRouter>
       <Switch>
        <Route exact path="/" component={Auth(Home,null)} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Auth(Main,true)} />
        <Route path="/mypage" component={Auth(MyPage,true)} />
        <Route path="/signup" component={Auth(SignUp,false)} />
        <Route path="/sendmail" component={Auth(SendMail,null)} />
        <Route path="/findpw" component={Auth(FindPw,null)} />
        <Route path="/quit" component={Auth(Quit,true)} />
        <Route path="/github" component={GithubTest} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;