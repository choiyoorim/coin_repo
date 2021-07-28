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
