import React from 'react';
import BoardContent from '../../Components/BoardContent';
import BoardInfo from '../../Components/BoardInfo';
function Main(){
    return(
        <Menu>
            <BoardContent>
                <BoardInfo>
                    <h2>Board</h2>
                </BoardInfo>
            </BoardContent>
        </Menu>



    );
}

export default Main;