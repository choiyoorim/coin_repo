import React, { Component } from "react";
import { createBrowserHistory } from "history";

export default class CancelButton extends Component {
  render() {
    const history = createBrowserHistory();
    return (
      <div>
        <button
          type="button"
          className="cancel-button"
          style={{
            border: "1px solid #bdbdbd",
            boxSizing: "border-box",
            borderRadius: "12px",
            fontSize: "15px",
            backgroundColor: "#F9FBFD",
            color: "#354356",
            width: "60px",
            height: "40px",
          }}
          onClick={function (e) {
            history.goBack();
            history.goForward();
          }}
        >
          취소
        </button>
      </div>
    );
  }
}
