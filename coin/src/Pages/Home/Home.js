import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
class Home extends Component{
    render(){
        return(
            <div class="Home">
                <div class = "homeHeader"><b>CO-IN</b></div>
                <br/><br />
                <Link to="/login"><button type="button" class = "btn1"> 시작하기 </button></Link>
                <form>
                    <br/><br/>
                    <div class="explain">
                        <p>
                            안녕하세요 저희는 코딩을 공부하는 사람들을 위한 웹 사이트 CO-IN 입니다.
                        <br /><br />
                        문구 수정 필요
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Home;