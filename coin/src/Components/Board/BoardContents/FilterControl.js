import React, { Component } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  .control-div {
    position: absolute;
    margin: 0;
    left: 120px;
    width: 180px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .control-ul {
    position: absolute;
    background-color: aliceblue;
    margin: 0px 0px;
    padding: 10px 8px;
    border-radius: 15px;
  }
  .control-li {
    list-style-type: none;
    display: block;
  }

  .control-a {
    text-decoration: none;
    padding-top: 3px;
    padding-left: 3px;
    color: #354356;
    display: block;
  }

  .control-li :hover {
    background-color: rgba(108, 139, 167, 0.1);
  }
`;

class FilterControl extends Component {
  render() {
    return (
      <StyledDiv>
        <div className="control-div">
          <ul className="control-ul">
            <li className="control-li">
              <a
                href="/create"
                className="control-a"
                onClick={function (e) {
                  e.preventDefault();
                  this.props.onChangeMode("create");
                }.bind(this)}
              >
                북마크 생성하기
              </a>
            </li>
            <li className="control-li">
              <a
                href="/update"
                className="control-a"
                onClick={function (e) {
                  e.preventDefault();
                  this.props.onChangeMode("update");
                }.bind(this)}
              >
                현재 북마크 수정하기
              </a>
            </li>
            <li className="control-li">
              <a
                href="/delete"
                className="control-a"
                onClick={function (e) {
                  e.preventDefault();
                  this.props.onChangeMode("delete");
                }.bind(this)}
              >
                현재 북마크 삭제하기
              </a>
            </li>
          </ul>
        </div>
      </StyledDiv>
    );
  }
}
export default FilterControl;
