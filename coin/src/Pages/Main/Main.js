import React, { useEffect, useState, useRef, Component } from "react";
import reactDom from "react-dom";
import BoardContent from "../../Components/Board/BoardContent";
import BoardInfo from "../../Components/Board/BoardInfo";
import Menu from "../../Components/Menu";
import face from "../../img/face.PNG";
import { logoutUser } from "../../action/userAction";
import LogoutButton from "../../Components/LogoutButton";
import UserInfoId from "../../Components/UserInfoId";

import { createBoard, readBoard, deleteBoard } from "../../action/boardAction";
import { useSelector, useDispatch } from "react-redux";
import { readOption } from "../../action/optionAction";
import { readItem } from "../../action/itemAction";
import { readTodo } from "../../action/bojAction";

const mainProfile = {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  verticalAlign: "middle",
};

function Main() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const _id = useSelector((state) => state.user.Id); //사용자 아이디

  useEffect(() => {
    let body = {
      id: _id, //사용자 아이디 받아오기
    };
    dispatch(readBoard(body));
    dispatch(readOption(body));
    dispatch(readItem(body));
    dispatch(readTodo(body));
  }, []);

  const parentFunction = (data) => {
    const _inputData = {
      id: _id,
      text: data,
    };
    dispatch(createBoard(_inputData));
  };

  const onRemove = (id) => {
    id = parseInt(id);
    const _inputData = {
      id: id,
      user: _id,
    };
    if (window.confirm("현재 보드를 삭제합니다.")) {
      dispatch(deleteBoard(_inputData));
      alert("삭제되었습니다.");
    }
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
          <UserInfoId></UserInfoId>
          <LogoutButton></LogoutButton>
        </span>
      </div>

      <div>{titleList}</div>
      <Menu parentFunction={parentFunction}></Menu>
    </div>
  );
}

export default Main;
