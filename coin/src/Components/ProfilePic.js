import React from 'react';
import styled from 'styled-components';

const PicTemplateBlock = styled.div`
    width:200px;
    height:200px;

    position:relative;
    background: #6C8BA7;
    border-radius: 100px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);
    left:156px;
    top:136px;
    margin:0;
`;

function ProfilePic({children}){
    return <PicTemplateBlock>{children}</PicTemplateBlock>;
    /*children에 사용자 사진을 넣으면 됨*/
}

export default ProfilePic;