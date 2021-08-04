import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import BoardInfo from "./Board/BoardInfo";
import Main from "../Pages/Main/Main";

class MenuActive extends Component {
  constructor(props) {
    super(props);
  }

  childSecondFunction = (data) => {
    this.props.parentSecondFunction(data);
  };

  render() {
    return (
      <div className="toggleMenu">
        <button
          className="makeBoard"
          onClick={() => this.childSecondFunction(`github`)}
        >
          + Github
        </button>
        <button
          className="makeBoard"
          onClick={() => this.childSecondFunction(`baekjoon`)}
        >
          + BaekJoon
        </button>
        <button
          className="makeBoard"
          onClick={() => this.childSecondFunction(`bookmark`)}
        >
          + BookMark
        </button>
        <button
          className="makeBoard"
          onClick={() => this.childSecondFunction(`classes`)}
        >
          + Classes
        </button>
        <button
          className="makeBoard"
          onClick={() => this.childSecondFunction(`programmers`)}
        >
          + Programmers
        </button>
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
