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
    cursor: pointer;
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
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 100%;
    max-width: 450px;
    margin:0 auto;
    border-radius: .3rem;
    background-color: #fff;
    animation: modal-show .3s;
    overflow: hidden;
  }
  .modal > section > .popUpTitle {
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
  }
  .modal > section > .popUpTitle button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  .modal > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
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
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = { isToggleOn: false };
    this.onMenuHandler = this.onMenuHandler.bind(this);
  }
  

  childFunction = (data) => {
    this.props.parentFunction(data);
  }
  
  parentSecondFunction = (data) => {
    this.childFunction(data);
  }

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
        {this.state.isToggleOn && <MenuActive parentSecondFunction={this.parentSecondFunction}/>}
      </div>
    );
  }
}

export default Menu;
