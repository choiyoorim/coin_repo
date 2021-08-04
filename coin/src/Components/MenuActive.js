import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import BoardInfo from "./Board/BoardInfo";
import Main from '../Pages/Main/Main';
import PopUp from "./PopUp";

class MenuActive extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  childSecondFunction = (data) =>{
    this.props.parentSecondFunction(data);
  }

  

  render() {
    return (
      <div className="toggleMenu">
        <button className="makeBoard" onClick={()=>this.childSecondFunction(`github`)}>+ Github</button>
        <button className="makeBoard" onClick={()=>this.childSecondFunction(`baekjoon`)}>+ BaekJoon</button>
        <button className="makeBoard" onClick={()=>this.childSecondFunction(`bookmark`)}>+ BookMark</button>
        <button className="makeBoard" onClick={()=>this.childSecondFunction(`programmers`)}>+ Programmers</button>
        <br /> <br />
        <div className="control">
          <a href="/mypage">개인설정</a>
        </div>
        <div className="control">
           <a onClick={this.openModal}>도움말</a>
           <PopUp open={this.state.modalOpen} close={this.closeModal} title="제목">
             일단 이런 식으로 만들어놓고 수정하기 
             어디를 누르면 어떻게 된다는 문구 표기
          </PopUp>
        </div>
      </div>      
    );
  }
}

export default MenuActive;