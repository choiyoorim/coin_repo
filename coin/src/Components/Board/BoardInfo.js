import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import BoardContent from './BoardContent';
import moment from "moment";
import 'moment/locale/ko';

const BoardInfoBlock = styled.div`
    border-bottom: 2px solid #6C8BA7;
    h3.stop-dragging{
        -ms-user-select:none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
`

const BoardInfo=({onDrag,text})=>{
    const [mouseDown,setMouseDown] = useState(false);
    useEffect(()=>{
        const handleMouseUp = () => setMouseDown(false);

        window.addEventListener('mouseup',handleMouseUp);

        return()=>{
            window.addEventListener('mouseup',handleMouseUp);
        };
    },[]);

    useEffect(()=>{
        const handleMouseMove = (e) => onDrag(e.movementX,e.movementY);

        if(mouseDown){
            window.addEventListener('mousemove',handleMouseMove);
        }

        return()=>{
            window.removeEventListener('mousemove',handleMouseMove);
        };
    },[mouseDown,onDrag]);

    const handleMouseDown = () => setMouseDown(true);

    //오늘 날짜 띄우는 코드
    //const nowTime = moment().format('YYYY-MM-DD');
    //console.log(nowTime);

    if(true){
        return(
                <>
                    <BoardInfoBlock>
                        <div className = "boardheader" onMouseDown={handleMouseDown}>
                            <h3 className="stop-dragging">&nbsp;{text}</h3>  
                        </div>
                    </BoardInfoBlock>
                </>
        );
    }
    
}

export default BoardInfo;