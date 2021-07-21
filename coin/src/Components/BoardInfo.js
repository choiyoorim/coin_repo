import React from 'react';
import styled from 'styled-components';

const BoardInfoBlock = styled.div`
    border-bottom: 1px solid #6C8BA7;
`

function BoardInfo({children}){
    return(
        <BoardInfoBlock>{children}</BoardInfoBlock>
    );
}

export default BoardInfo;