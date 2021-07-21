import "./FindPw.css"
import React, { Component } from 'react';

class FindPw extends Component{
    render(){
        return(
            <div class="Findpw">
                <h1 class = "email_h1">이메일 입력</h1>
                <div class="findpw">
                    <form action="#">
                        <input type="email" class="email_input" placeholder="email" />
                    </form>
                </div>
                <h3 class = "email_h3">유효하지 않은 이메일은 보내지지 않습니다.</h3>
                <button type='submit' class = "btn3">이메일 전송하기</button>
                <br/>
                <br/>
                <a class="linkFindK" href="#">카카오톡에서 비밀번호 찾기</a>
            </div>
        );
    }
}

export default FindPw;