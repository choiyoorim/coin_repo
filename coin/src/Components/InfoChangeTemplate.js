import React from 'react';
import styled from 'styled-components';
import InfoTemplate from './InfoTemplate';

const InfoChangeTemplateBlock = styled.div`
    width:900px;
    height:750px;
    position:relative;
    left:200px;
    top:80px;
    background-color:#F9FBFD;
    border-radius:20px;
    overflow-y:scroll;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

function InfoChangeTemplate({children}){
    return <InfoChangeTemplateBlock>{children}</InfoChangeTemplateBlock>;
}

export default InfoChangeTemplate;