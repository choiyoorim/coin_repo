import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom"
import {useSelector} from 'react-redux';

const ProfileBlock = styled.div`
    position:relative;
    left:200px;
    top:200px;

`;

function Profile(){
    const {id} = useSelector(state=>({
        id:state.user.Id,
    }))
    console.log({id})
    return(
        /*사용자 정보를 여기로 보내서 여기서 보여지게*/
        <ProfileBlock>
            <h1 className="id-inst">{id}님</h1>
            <Link to="/main">
                <button className="go-to-main">메인으로 돌아가기</button>
            </Link>
        </ProfileBlock>
        
    )
}

export default Profile;