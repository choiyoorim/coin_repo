import React, { useState, useEffect } from "react";
import BoardContent from "../../Components/Board/BoardContent";
import Menu from "../../Components/Menu";
import face from "../../img/face.PNG";

import { createBoard, readBoard, deleteBoard } from "../../_action/boardAction";
import { useSelector, useDispatch } from "react-redux";

const mainProfile = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  verticalAlign: "middle",
};

function Main() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(readBoard());
  }, []);

  const parentFunction = (data) => {
    const _inputData = {
      text: data,
    };
    dispatch(createBoard(_inputData));
  };

  const onRemove = (id) => {
    id = parseInt(id);
    const _inputData = {
      id: id,
    };
    dispatch(deleteBoard(_inputData));
  };

  const titleList = board.map((row) => (
    <BoardContent
      key={row.board_ID}
      text={row.name}
      value={row.board_ID}
      onClick={onRemove}
    ></BoardContent>
  ));

  return (
    <div>
      <div
        style={{
          display: "inline-block",
          float: "right",
          margin: "5px 20px 0px 0px",
          display: "fixed",
        }}
        oncontextmenu="return false"
        ondragstart="return false"
        onselectstart="return false"
      >
        <img src={face} alt="여기요" style={mainProfile} />
        <span>
          <b> 아이디 들어갈 부분</b> 님
        </span>
      </div>

      <div>{titleList}</div>
      <Menu parentFunction={parentFunction}></Menu>
    </div>
  );
}

export default Main;
