import React, {Component} from "react";
import './Sendmail.css';

class Sendmail extends Component{
    render(){
        return(
            <div class = "Sendmail">
                <form class = "confirm">
                    <b>새로운 비밀번호</b> &nbsp; <input type="password" placeholder="Password" id="password1" class = "pw1_input" />
                    <br/>
                    <br/>
                    <b>비밀번호 재확인</b> &nbsp; <input type="password" placeholder="Confirm Password" id = "password2" class = "pw2_input" />
                    <br />
                    <button type ="submit" name = "pwConfirm" class = "btn2">확인</button>
                </form>
            </div>
        )
    }
}

export default Sendmail;