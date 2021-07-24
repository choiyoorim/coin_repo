import React from 'react';
import BoardContent from '../../Components/BoardContent';
import BoardInfo from '../../Components/BoardInfo';
let posX = 0;
let posY = 0;

let originalX = 0;
let originalY = 0;

const dragStartHandler = e=>{
    const img = new Image();
    e.dataTransfer.setDragImage(img,0,0);

    posX = e.clientX;
    posY = e.clientY;

    originalX = e.target.offsetLeft;
    originalY = e.target.offsetTop;

}

const dragHandler = e => {
    e.target.style.left = `${e.target.offsetLeft + e.clientX - posX}px`;
    e.target.style.top = `${e.target.offsetTop + e.clientY - posY}px`;
    posY = e.clientY;
    posX = e.clientX;
}

function Main(){
    return(
        <>  
            <BoardContent>
                <BoardInfo>
                    <h2>Board</h2>
                </BoardInfo>
            </BoardContent>
        </>



    );
}

export default Main;