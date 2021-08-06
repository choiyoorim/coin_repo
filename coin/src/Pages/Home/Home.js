import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { withRouter } from 'react-router';
class Home extends Component{
    render(){
        return(
            <div class="Home">
                <div class = "header_h1"><h1>CO-IN</h1></div>
                <br/>
                <Link to="/login"><button type="button" class = "btn1"> 시작하기 </button></Link>
                <form>
                    <br/>
                    <br/>
                    <br/>
                    <span class="explain">안녕하세요 저희는 코딩을 공부하는 사람들을 위한 웹 사이트 CO-IN 입니다.
                    </span>
                </form>
            </div>
        );
    }
}

export default Home;