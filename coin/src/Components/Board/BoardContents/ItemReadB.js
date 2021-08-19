import React, { Component } from "react";

import StyledItem from "../StyledItem";

class ItemReadB extends Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
  }
  onRemove(e) {
    console.log(e.target.value);
    this.props.onChangeItem(e.target.value);
  }

  getItem() {
    var article = this.props.data.map(
      function (item) {
        if (typeof item == "string") {
          return (
            <div key={item} className="filter-item">
              <div
                className="filter-name"
                onClick={() => {
                  var openNewWindow = window.open("about:blank");
                  openNewWindow.location.href = `https://www.acmicpc.net/problem/${item}`;
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {item}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={item.number}
              className="filter-item"
              style={{ display: "flex" }}
            >
              <div
                className="filter-name"
                onClick={() => {
                  var openNewWindow = window.open("about:blank");
                  openNewWindow.location.href = `https://www.acmicpc.net/problem/${item.number}`;
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {item.number}
              </div>
              <button
                class="delete-item"
                value={item.boj_ID}
                style={{
                  width: "20px",
                  textAlign: "center",
                  borderStyle: "none",
                  position: "absolute",
                  right: "20px",
                  backgroundColor: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
                onClick={this.onRemove}
              >
                &times;
              </button>
            </div>
          );
        }
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

export default ItemReadB;
