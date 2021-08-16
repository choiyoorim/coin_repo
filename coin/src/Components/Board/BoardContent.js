import React,{useState,useRef} from 'react';
import Draggable from 'react-draggable';
import Resizer from './Resizer';
import { Direction } from './Direction';
import './BoardContent.css';
import BoardInfo from './BoardInfo';
import CalendarTest from '../../Pages/CalendarTest';

function BoardContent(props){
    const boardRef = useRef(null);

    const handleDrag = (movementX,movementY)=>{
        const board = boardRef.current;
        if(!board) return;

        const {x,y} = board.getBoundingClientRect();

        board.style.left = `${x + movementX}px`;
        board.style.top = `${y + movementY}px`;
    }

    const handleResize = (direction,movementX,movementY)=>{
        const board = boardRef.current;
        if(!board) return;

        const {width,height,x,y} = board.getBoundingClientRect();
        const resizeTop = () => {
            board.style.height = `${height-movementY}px`;
            board.style.top = `${y+movementY}`;
        }

        const resizeRight = () => {
            board.style.width = `${width + movementX}px`;
        }

        const resizeBottom = () => {
            board.style.height = `${height + movementY}px`;
        } 

        const resizeLeft = () => {
            board.style.width = `${width - movementX}px`;
            board.style.left = `${x + movementX}px`
        }

        switch(direction){
            case Direction.TopLeft:
                resizeTop();
                resizeLeft();
                break;
            case Direction.Top:
                resizeTop();
                break;
            case Direction.TopRight:
                resizeTop();
                resizeRight();
                break;
            case Direction.Right:
                resizeRight();
                break;
            case Direction.BottomRight:
                resizeBottom();
                resizeRight();
                break;
            case Direction.Bottom:
                resizeBottom();
                break;
            case Direction.BottomLeft:
                resizeBottom();
                resizeLeft();
                break;
            case Direction.Left:
                resizeLeft();
                break;
            default:
                break
        }
    }                                                                                                                                                                         

    return(
        <div className = "boardcontent" ref={boardRef}>
            <Resizer onResize={handleResize}></Resizer>
            <BoardInfo onDrag = {handleDrag} text={props.text}/>
                                       {props.text == "github" && <div> 
                <br/> <CalendarTest></CalendarTest> <br /> 
                커밋 아직 안했으면 "아직 커밋 전입니다" <br/>
                커밋 했으면 "커밋 완료!"<br />
                같은 문구 띄우기
                </div>
            }
        </div>
                
    );
}

export default BoardContent;