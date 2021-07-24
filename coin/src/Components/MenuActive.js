import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

class MenuActive extends Component {
  render() {
    return (
      <div className="toggleMenu">
        <button className="makeBoard">+ Github</button>
        <button className="makeBoard">+ BackJoon</button>
        <button className="makeBoard">+ BookMark</button>
        <button className="makeBoard">+ Programmers</button>
        <br /> <br />
        <div className="control">
          <a href="/mypage">개인설정</a>
        </div>
        <div className="control">
          <a href="#">도움말</a>
        </div>
      </div>
    );
  }
}

export default MenuActive;
