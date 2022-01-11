import React from "react";
import { createGlobalStyle } from "styled-components";
import MenuActive from "./MenuActive";

const GlobalStyle = createGlobalStyle`
.menu {
    height: 70px;
    width: 70px;
    background-color: #F9FBFD;
    color: #354356;
    font-size: 15px;
    border-radius: 35px;
    position: fixed;
    z-index: 6;
    right: 30px;
    bottom: 30px;
    border-style: none;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.1);
  }
  
  .menu:active {
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.1);
  }
  
  .toggleMenu {
    background-color: #F9FBFD;
    color: #354356;
    opacity: 0.6;
    position: absolute;
    border-radius: 35px;
    height: 350px;
    width: 250px;
    right: 30px;
    bottom: 30px;
  }
  
  .toggleMenu > * {
    font-size: 20px;
    position: relative;
    width: 160px;
    left: 50px;
    top: 50px;
    padding-bottom: 15px;
  }

  .makeBoard{
      background-color:#F9FBFD;
      padding: 0 0 20px 0;
      border:0;
      outline:0;
      text-align:left;
  }
  
  .control {
    margin:0;
    color: #6c8ba7;
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal button {
    outline: none;
    border: 0;
  }
  .modal > section {
    width: 100%;
    height: 100%;
    margin:0 auto;
    border-radius: .3rem;
    animation: modal-show .3s;
    overflow: hidden;
  }
  
  .modal > section > .popUpTitle button {
    position: absolute;
    top: 10px;
    left: 13px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: white;
    cursor: pointer;
    width: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.0);
  }

  .modal.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show .3s;
  }
  @keyframes modal-show {
    from {
        opacity: 0;
        margin-top: -50px;
    }
    to {
        opacity: 1;
        margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  .exProfile{
    position: absolute;
    border: 3px solid white;
    border-radius: 35px;
    height: 45px;
    width: 230px;
    top: 3px;
    right:5px;
  }

  .exToggle{
    position: absolute;
    border: 3px solid white;
    border-radius: 35px;
    height: 190px;
    width: 200px;
    right: 55px;
    bottom: 160px;
  }

  .exSet{
    position: absolute;
    border: 3px solid white;
    border-radius: 35px;
    height: 28px;
    width: 200px;
    right: 55px;
    bottom: 107px;
  }

  .exPopUp{
    position: absolute;
    border: 3px solid white;
    border-radius: 35px;
    height: 28px;
    width: 200px;
    right: 55px;
    bottom: 65px;
  }

  .arrow1{
    position: absolute;
    right: 290px;
    top: -28px;
    font-size: 70px;
    color: white;
  }

  .arrow2{
    position: absolute;
    right: 290px;
    bottom: 240px;
    font-size: 70px;
    color: white;
  }

  .arrow3{
    position: absolute;
    right: 290px;
    bottom: 88px;
    font-size: 70px;
    color: white;
  }

  .arrow4{
    position: absolute;
    right: 290px;
    bottom: 43px;
    font-size: 70px;
    color: white;
  }

  .howTo1{
    position: absolute;
    right: 380px;
    top: 10px;
    text-align: right;
    border-radius: 35px;
    font-size: 25px;
    color: white;
  }

  .howTo2{
    position: absolute;
    right: 380px;
    bottom: 200px;
    text-align: right;
    border-radius: 35px;
    font-size: 25px;
    color: white;
  }

  .howTo3{
    position: absolute;
    right: 380px;
    bottom: 113px;
    text-align: right;
    border-radius: 35px;
    font-size: 25px;
    color: white;
  }

  .howTo4{
    position: absolute;
    right: 380px;
    bottom: 63px;
    text-align: right;
    border-radius: 35px;
    font-size: 25px;
    color: white;
  }
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: false };
    this.onMenuHandler = this.onMenuHandler.bind(this);
  }

  sendBoardName = (data) => {
    this.props.getBoardName(data);
  };

  getBoardNameFromMenu = (data) => {
    this.sendBoardName(data);
  };

  onMenuHandler() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <GlobalStyle />
        <button className="menu" onClick={this.onMenuHandler}>
          메뉴
        </button>
        {this.state.isToggleOn && (
          <MenuActive getBoardNameFromMenu={this.getBoardNameFromMenu} />
        )}
      </div>
    );
  }
}

export default Menu;
