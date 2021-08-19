import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Home.css";
class Home extends Component {
  render() {
    return (
      <div class="Home">
        <div class="homeHeader">
          <b>CO-IN</b>
        </div>
        <br />
        <br />
        <Link to="/login">
          <button type="button" class="btn1">
            {" "}
            시작하기{" "}
          </button>
        </Link>
        <form>
          <br />
          <br />
          <div class="explain">
            <p>
              <h2>환영합니다!</h2>
              <br />
              저희는 코딩하는 사람들을 위한 <b>
                "코딩용 자기관리 웹 사이트"
              </b>{" "}
              CO-IN 입니다.
              <br />
              <br />
              자주 방문하는 사이트를 한 눈에 볼 수 있도록 카테고리화하여
              여러분들께 제공합니다.
              <br />
              <br />
              저희 CO-IN과 함께 꾸준한 1일 1커밋을 도전하세요!
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
