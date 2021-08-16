import React from 'react';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../action/userAction';
import {withRouter} from "react-router";

function LogoutButton({history}){
    const dispatch = useDispatch();
    const onClickHandler = (event) =>{
        event.preventDefault();
        dispatch(logoutUser()).then((res)=>{
            if(res.payload.success){
                alert("로그아웃이 완료되었습니다");
                history.push('/login');
            }
        })
    }
    return(
        <button className="btn2" type="submit" onClick={onClickHandler}>logout</button>
    )
}

export default withRouter(LogoutButton);