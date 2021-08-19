import React, { useState, useRef, useEffect } from "react";

import "./BoardContent.css";
import { Direction } from "./Direction";
import FilterRead from "./BoardContents/FilterRead";
import ItemReadB from "./BoardContents/ItemReadB";
import { useSelector, useDispatch } from "react-redux";
import { createTodo, deleteTodo } from "../../_action/bojAction";
import FilterCreate from "./BoardContents/FilterCreate";
import Resizer from "./Resizer";

function BoardBaek(props) {
  const boardRef = useRef(null);
  const itemRef = useRef(null);
  const [optionsBaek, setoptionsBaek] = useState([
    { option_ID: 0, option_name: "TODO" },
    { option_ID: 1, option_name: "SOLVED" },
    { option_ID: 2, option_name: "FAILED" },
  ]);
  const [selectedOpValueBaek, setselectedOpValueBaek] = useState(0);
  const [filteredItemBaek, setfilteredItemBaek] = useState([]);
  const [hidden, sethidden] = useState(false);
  const [itemMode, setitemMode] = useState({ mode: "read", id: 0 });
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo);

  const [Solved, setSolved] = useState([]); //배열에 각각 저장
  const [Failed, setFailed] = useState([]);

  const handleResize = (direction, movementX, movementY) => {
    const board = boardRef.current;
    const item = itemRef.current;
    if (!board) return;
    if (!item) return;

    const { width, height, x, y } = board.getBoundingClientRect();
    const resizeTop = () => {
      board.style.height = `${height - movementY}px`;
      board.style.top = `${y + movementY}`;
      item.style.height = `${height + movementY - 150}px`;
    };

    const resizeRight = () => {
      board.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      board.style.height = `${height + movementY}px`;
      item.style.height = `${height + movementY - 150}px`;
    };

    const resizeLeft = () => {
      board.style.width = `${width - movementX}px`;
      board.style.left = `${x + movementX}px`;
    };

    switch (direction) {
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
        break;
    }
  };

  useEffect(() => {
    fetch("api/baekjoon/solved")
      .then((res) => res.json())
      .then((data) => {
        setSolved(Solved.concat(data));
      });
    fetch("api/baekjoon/failed")
      .then((res) => res.json())
      .then((data) => {
        setFailed(Failed.concat(data));
      });
    setfilteredItemBaek(todo);
  }, []);

  useEffect(() => {
    setfilteredItemBaek(todo);
    filterItems(0);
  }, [todo]);

  const filterItems = (val) => {
    val = parseInt(val);
    setselectedOpValueBaek(val);

    if (val === 0) {
      setfilteredItemBaek(todo);
    } else if (val === 1) {
      setfilteredItemBaek(Solved);
    } else {
      setfilteredItemBaek(Failed);
    }
  };

  const changeItems = (_id) => {
    _id = parseInt(_id);
    setitemMode({
      mode: "item-delete",
      id: _id,
    });
  };

  const deleteItems = (_mode, _id) => {
    let article = null;
    let body;

    if (_mode === "item-delete") {
      if (window.confirm("현재 아이템를 삭제합니다.")) {
        body = { id: _id };
        dispatch(deleteTodo(body));
        setitemMode({ mode: "read", id: null });
        alert("삭제되었습니다.");
      }
    }
    return article;
  };

  const createItems = (_number) => {
    let body = {
      number: _number,
      user: "lis",
    };
    dispatch(createTodo(body)).then(filterItems(1));
    sethidden(false);
  };

  const onCreateHandler = () => {
    sethidden(true);
  };

  return (
    <>
      <div className="baekjoon-board" ref={boardRef}>
        <Resizer onResize={handleResize}></Resizer>
        <div className="option-container">
          <FilterRead
            optionValue={selectedOpValueBaek} //현재 옵션 전달
            allOptions={optionsBaek} //전체 옵션
            changeOption={filterItems} //함수 처리
          />
        </div>
        {selectedOpValueBaek == 0 && (
          <div className="item-createtab" onClick={onCreateHandler}>
            풀 문제 추가하기
          </div>
        )}
        {hidden && <FilterCreate onSubmit={createItems} />}
        <div className="item-container" ref={itemRef}>
          <ItemReadB data={filteredItemBaek} onChangeItem={changeItems} />
        </div>
        {itemMode.mode !== "read" && deleteItems(itemMode.mode, itemMode.id)}
      </div>
    </>
  );
}
export default BoardBaek;
