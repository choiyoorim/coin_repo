import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import BoardInfo from "./Board/BoardInfo";
import Main from "../Pages/Main/Main";
import PopUp from "./PopUp";

class MenuActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  sendBoardNameFromMenu = (data) => {
    this.props.getBoardNameFromMenu(data);
  };

  render() {
    return (
      <div className="toggleMenu">
        <button
          className="makeBoard"
          onClick={() => this.sendBoardNameFromMenu(`github`)}
        >
          + Github
        </button>
        <button
          className="makeBoard"
          onClick={() => this.sendBoardNameFromMenu(`baekjoon`)}
        >
          + BaekJoon
        </button>
        <button
          className="makeBoard"
          onClick={() => this.sendBoardNameFromMenu(`bookmark`)}
        >
          + BookMark
        </button>
        <button
          className="makeBoard"
          onClick={() => this.sendBoardNameFromMenu(`programmers`)}
        >
          + Programmers
        </button>
        <br /> <br />
        <div className="control">
          <a href="/mypage">개인설정</a>
        </div>
        <div className="control">
          <a onClick={this.openModal} style={{ cursor: "pointer" }}>
            도움말
          </a>
          <PopUp
            open={this.state.modalOpen}
            close={this.closeModal}
            title="제목"
          ></PopUp>
        </div>
      </div>      
    );
  }
}

export default MenuActive;