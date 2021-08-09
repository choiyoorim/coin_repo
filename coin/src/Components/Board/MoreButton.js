import React, { Component } from "react";
import styled from "styled-components";

const StyledBtn = styled.div`
  .more-button {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border: 2px solid #a9c5de;
    margin-left: 10px;
    border-radius: 20px;
    background-color: aliceblue;
    font-weight: 900;
  }
`;

export default class MoreButton extends Component {
  onClickHandler = () => {
    this.props.onClick();
  };
  render() {
    return (
      <StyledBtn>
        <div className="more-button" onClick={this.onClickHandler}>
          ···
        </div>
      </StyledBtn>
    );
  }
}
