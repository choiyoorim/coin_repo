import React, { Component } from 'react';
import './Home.css';
class Home extends Component{
    render(){
        return(
            <div class="Home">
                <div class = "header_h1"><h1>CO-IN</h1></div>
                <br/>
                <button type="button" class = "btn1"> 시작하기 </button>
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