import React,{useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {authUser} from '../action/userAction';

export default function (SpecificComponent,option,adminRoute=null){
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){
         const dispatch = useDispatch();

         useEffect(() => {
        
             dispatch(authUser()).then((res)=>{
                console.log(res)
                
                if(!res.payload.isAuth) {
                    if(option) {
                        alert('로그인하세요')
                        props.history.push('/login')
                    }
                } 
        
             });
         },[]);
    return(
        <SpecificComponent></SpecificComponent>
    )
    }
    return AuthenticationCheck
}