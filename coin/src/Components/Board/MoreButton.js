import React, { Component } from "react";
import styled from "styled-components";
import FilterControl from "./BoardContents/FilterControl";
import FilterCreate from "./BoardContents/FilterCreate";
import FilterUpdate from "./BoardContents/FilterUpdate";

const StyledBtn = styled.div`
  .more-button {
    cursor: pointer;
    width: 26px;
    height: 26px;
    border: 2px solid #a9c5de;
    margin-left: 10px;
    border-radius: 20px;
    background-color: aliceblue;
    line-height: 165%;
    font-weight: 900;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export default class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      mode: "read",
      selectedOption: this.props.currOption,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onClickHandler = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  modifyOption = (option) => {
    let article = null;
    if (this.state.mode === "create") {
      article = (
        <FilterCreate
          onSubmit={function (_title) {
            this.props.changeBoard(this.state.mode, _title);
            this.setState({
              mode: "read",
            });
          }.bind(this)}
        ></FilterCreate>
      );
    } else if (this.state.mode === "update") {
      article = (
        <FilterUpdate
          data={option}
          onSubmit={function (_value) {
            this.props.changeBoard(this.state.mode, _value);

            this.setState({
              mode: "read",
            });
          }.bind(this)}
        ></FilterUpdate>
      );
    }

    return article;
  };

  editOption = (option) => {
    const article = (
      <FilterControl
        onChangeMode={function (_mode) {
          if (_mode === "delete") {
            if (option.id === 0) {
              alert("현재 옵션은 삭제할 수 없습니다.");
            } else if (
              window.confirm(`${option.value} 안의 모든 데이터가 삭제됩니다.`)
            ) {
              this.props.changeBoard(_mode);
              alert("deleted!");
            }
          } else {
            this.setState({
              mode: _mode,
            });
          }
          this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
          }));
        }.bind(this)}
      />
    );
    return article;
  };

  render() {
    return (
      <StyledBtn>
        <div className="more-button" onClick={this.onClickHandler}>
          ···
        </div>
        <div className="more-button-toggle">
          {this.state.isToggleOn
            ? this.editOption(this.props.currOption)
            : null}
        </div>
        {this.state.mode !== "read" || "delete"
          ? this.modifyOption(this.props.currOption)
          : null}
      </StyledBtn>
    );
  }
}
