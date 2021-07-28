import react from 'react';
import usePortal from 'react-useportal';

import BoardContent from './BoardContent';

const BoardPortal = (props)=>{
    const {Portal} = usePortal({
        bitdTo: document.getElementById('board-portal'),
    });

    return(
        <Portal>
            <BoardContent {...props}></BoardContent>
        </Portal>
    )
}

export default BoardPortal;