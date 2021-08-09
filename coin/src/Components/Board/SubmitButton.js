import React, { Component } from "react";

export default class SubmitButton extends Component {
  render() {
    return (
      <div>
        <input
          type="submit"
          value="확인"
          style={{
            margin: "0px",
            border: "1px solid #bdbdbd",
            boxSizing: "border-box",
            borderRadius: "12px",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "15px",
            color: "#F9FBFD",
            backgroundColor: "#6C8BA7",
            width: "60px",
            height: "40px",
            marginLeft: "10px",
          }}
        ></input>
      </div>
    );
  }
}
