import React from 'react';
import styled from 'styled-components';

const ProfileBlock = styled.div`
    position:relative;
    left:186px;
    top:200px;
    h1{
        margin:0;
        font-size:36px;
        color:#354356;
    }
`;

function Profile(){
    return(
        /*사용자 정보를 여기로 보내서 여기서 보여지게*/
        <ProfileBlock>
            <h1>PROFILE</h1>
        </ProfileBlock>
    )
}

export default Profile;