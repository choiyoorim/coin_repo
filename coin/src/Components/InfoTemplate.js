import React from 'react';
import styled from 'styled-components';

const InfoTemplateBlock = styled.div`
    width:512px;
    height:750px;
    position:relative;
    background: #F9FBFD;
    border-radius: 20px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);
    top:80px;
    left:120px;
    float:left;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

function InfoTemplate({children}){
    return <InfoTemplateBlock>{children}</InfoTemplateBlock>;
}

export default InfoTemplate;