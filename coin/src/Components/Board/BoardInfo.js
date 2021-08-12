import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BoardInfoBlock = styled.div`
  // border-bottom: 2px solid #6c8ba7;
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
      <div className="board">
        <BoardInfoBlock>
          <div className="boardheader" onMouseDown={handleMouseDown}>
            <h3 className="stop-dragging">&nbsp;&nbsp;{text}</h3>
          </div>
        </BoardInfoBlock>
      </div>
    );
  }
};
export default BoardInfo;
