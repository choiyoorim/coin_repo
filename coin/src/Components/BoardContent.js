import React from 'react';
import styled from 'styled-components';

const BoardContentStyle = styled.div`
    width:300px;
    height:700px;
    background-color:#F9FBFD;
    border-radius: 10px;
    
`

function BoardContent({children}){
    return(
        <BoardContentStyle>{children}</BoardContentStyle>
    );
}

export default BoardContent;