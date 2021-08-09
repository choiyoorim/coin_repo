import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterForm from "./BoardContents/FilterForm";
import BoardContent from "./BoardContent";
const BoardInfoBlock = styled.div`
  border-bottom: 2px solid #6C8BA7;
  h3.stop-dragging {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;
const BoardInfo = ({ onDrag, text }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const options = [{ id: 0, value: "All" }];
  const options_baek = [{id: 0, value: "내가 풀 문제"}, {id: 1, value: "내가 맞은 문제"}, {id: 2, value: "내가 틀린 문제"}, {id:3, value: "제출했지만 만점이 아닌 문제"}];
  const contents = [];
  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);
  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.movementX, e.movementY);
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);
  const handleMouseDown = () => setMouseDown(true);
  if (true) {
    return (
      <BoardInfoBlock>
        <div className="boardheader" onMouseDown={handleMouseDown}>
          <h3 className="stop-dragging">&nbsp; {text}</h3>
        </div>
        { text != "github" && text != "baekjoon" &&
        <div>
        <FilterForm data={options} content={contents} />
        </div>
        }
        { text == "baekjoon" &&
        <div>
        <FilterForm data={options_baek} content={contents} />
        </div>
        }
        </BoardInfoBlock>
    );
  }
};
export default BoardInfo;