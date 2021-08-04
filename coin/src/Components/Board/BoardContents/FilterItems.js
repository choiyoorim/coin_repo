import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StyledItem from "../StyledItem";

const StyleBtn = styled.div`
  .button-set {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .item-update,
  .item-delete {
    border: 1px solid #bdbdbd;
    border-radius: 12px;
    margin-top: 10px;
    margin-left: 5px;
    font-size: 12px;
    background-color: #f9fbfd;
    color: #354356;
    width: 40px;
    height: 30px;
  }
  .item-delete:hover {
    background-color: #eb6054;
    color: #f9fbfd;
  }
  .item-update:hover {
    background-color: #6c8ba7;
    color: #f9fbfd;
  }
`;

class FilterItems extends Component {
  constructor(props) {
    super(props);

    this.changeItem = this.changeItem.bind(this);
  }

  changeItem(e) {
    this.props.onChangeItem(e.target.value, e.target.className);
  }

  getItem() {
    var article = this.props.data.map(
      function (item) {
        return (
          <div key={item.id} className="filter-item">
            <div
              className="filter-name"
              onClick={() => {
                window.location.href = item.link;
              }}
            >
              {item.name}
              {/* <Link to={{ pathname: `${item.link}` }} target="_blank">
                {item.name}
              </Link> */}
            </div>

            <div className="filter-desc">{item.desc}</div>
            <StyleBtn>
              <div className="button-set">
                <button
                  value={item.id}
                  className="item-update"
                  onClick={this.changeItem}
                >
                  수정
                </button>
                <button
                  value={item.id}
                  className="item-delete"
                  onClick={this.changeItem}
                >
                  삭제
                </button>
              </div>
            </StyleBtn>
          </div>
        );
      }.bind(this)
    );
    return article;
  }

  render() {
    return (
      <div className="filter-items">
        <StyledItem>{this.getItem()}</StyledItem>
      </div>
    );
  }
}

export default FilterItems;
