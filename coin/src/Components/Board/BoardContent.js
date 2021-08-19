import React, { useState, useRef, useEffect } from "react";
import Resizer from "./Resizer";
import { Direction } from "./Direction";
import "./BoardContent.css";
import BoardInfo from "./BoardInfo";
import BoardBaek from "./BoardBaek";
import FilterRead from "./BoardContents/FilterRead";
import MoreButton from "./MoreButton";

import ItemRead from "./BoardContents/ItemRead";
import ItemCreate from "./BoardContents/ItemCreate";
import ItemUpdate from "./BoardContents/ItemUpdate";

import {
  createOption,
  deleteOption,
  updateOption,
} from "../../_action/optionAction";
import { useSelector, useDispatch } from "react-redux";
import { createItem, updateItem, deleteItem } from "../../_action/itemAction";

function BoardContent(props) {
  const boardRef = useRef(null);
  const itemRef = useRef(null);
  const [contents, setcontents] = useState([]);

  const [selectedOpValue, setselectedOpValue] = useState({
    id: 0,
    value: "All",
  });

  const [filteredItem, setfilteredItem] = useState(contents);

  const [hidden, sethidden] = useState(false);
  const [itemMode, setitemMode] = useState({ mode: "read", item_ID: 0 });
  const dispatch = useDispatch();
  const option = useSelector((state) => state.option);
  const item = useSelector((state) => state.item);

  let itemList = item.filter(
    (rowData) => rowData.options_boards_board_ID === props.value
  );

  let optionList = option.filter(
    (rowData) => rowData.boards_board_ID === props.value
  );
  optionList.unshift({
    option_ID: 0,
    option_name: "All",
    boards_board_ID: props.value,
  });

  useEffect(() => {
    itemList = item.filter(
      (rowData) => rowData.options_boards_board_ID === props.value
    );
    filterItems(selectedOpValue.option_ID);
  }, [item]);

  const handleDrag = (movementX, movementY) => {
    const board = boardRef.current;
    if (!board) return;

    const { x, y } = board.getBoundingClientRect();

    board.style.left = `${x + movementX}px`;
    board.style.top = `${y + movementY}px`;
  };

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

  const filterItems = (val) => {
    val = parseInt(val);
    let i = 0;
    while (i < optionList.length) {
      if (val === optionList[i].option_ID) {
        setselectedOpValue(optionList[i]); //현재 옵션 지정
        break;
      }
      i = i + 1;
    }

    if (val !== 0) {
      setfilteredItem(
        itemList.filter(function (rowData) {
          return rowData.options_option_ID === val; //아이템 필터링
        })
      );
    } else {
      setfilteredItem(itemList);
    }
  };

  const modOption = (mode, value) => {
    let body = {};

    switch (mode) {
      case "delete":
        body = {
          option_ID: selectedOpValue.option_ID,
        };
        dispatch(deleteOption(body));
        setselectedOpValue({ option_ID: 0, option_name: "All" });
        break;

      case "create":
        body = {
          option_name: value,
          boards_board_ID: props.value,
          user: "lis",
        };
        dispatch(createOption(body));
        break;

      case "update":
        body = {
          option_name: value,
          option_ID: selectedOpValue.option_ID,
        };
        dispatch(updateOption(body));
        break;
    }
  };

  const changeItems = (_mode, _id) => {
    _id = parseInt(_id);
    setitemMode({
      mode: _mode,
      item_id: _id,
    });
  };

  const updateItems = (_mode, _id) => {
    let article = null;
    let op = optionList.concat();
    op.shift();
    var i = 0;
    var editItem = {}; //현재 아이템
    while (i < filteredItem.length) {
      if (_id === filteredItem[i].item_ID) {
        editItem = filteredItem[i];
        break;
      }
      i = i + 1;
    }
    let body = {};

    if (_mode === "item-update") {
      article = (
        <ItemUpdate
          data={editItem}
          optionValue={editItem.options_option_ID} //현재 옵션 전달 = 2
          allOptions={op} //옵션 배열 전달
          onSubmit={function (_option_id, _title, _link, _desc) {
            body = {
              item_ID: _id,
              option_ID: _option_id,
              title: _title,
              link: _link,
              desc: _desc,
            };
            dispatch(updateItem(body)).then(filterItems(0));
            setitemMode({ mode: "read", item_id: null });
          }}
        ></ItemUpdate>
      );
    } else if (_mode === "item-delete") {
      if (window.confirm("현재 아이템를 삭제합니다.")) {
        body = { item_ID: editItem.item_ID };
        dispatch(deleteItem(body));
        setitemMode({ mode: "read", item_id: null });
        alert("삭제되었습니다.");
      }
    }

    return article;
  };

  const createItems = (_title, _link, _desc) => {
    let body = {
      title: _title,
      link: _link,
      desc: _desc,
      option_ID: selectedOpValue.option_ID,
      board_ID: props.value,
      user: "lis",
    };
    dispatch(createItem(body)).then(filterItems(selectedOpValue.option_ID));
    sethidden(false);
  };

  const onCreateHandler = () => {
    sethidden(true);
  };

  //보드 삭제 기능
  const onRemove = (e) => {
    props.onClick(e.target.value); //보드 삭제 기능
  };

  return (
    <div className="boardcontent" ref={boardRef}>
      <button class="delete_board" value={props.value} onClick={onRemove}>
        &times;
      </button>
      <Resizer onResize={handleResize}></Resizer>
      <BoardInfo onDrag={handleDrag} text={props.text} />
      {props.text != "GITHUB" && props.text != "BAEKJOON" && (
        <>
          <div className="option-container">
            <FilterRead
              optionValue={selectedOpValue.option_ID} //현재 옵션 전달
              allOptions={optionList} //전체 옵션
              changeOption={filterItems} //함수 처리
            />
            <MoreButton
              currOption={selectedOpValue}
              changeBoard={changeOption}
            />
          </div>

          {selectedOpValue.option_ID !== 0 && (
            <div className="item-createtab" onClick={onCreateHandler}>
              내용 추가하기
            </div>
          )}

          {hidden && <ItemCreate onSubmit={createItems} />}

          <div className="item-container" ref={itemRef}>
            <ItemRead data={filteredItem} onChangeItem={changeItems} />
          </div>
        </>
      )}
      {props.text == "GITHUB" && (
        <div ref={itemRef}>
          <br /> <CalendarTest></CalendarTest> <br />
        </div>
      )}
      {props.text == "BAEKJOON" && (
        <div ref={itemRef}>
          <BoardBaek></BoardBaek>
        </div>
      )}
      {itemMode.mode !== "read" && updateItems(itemMode.mode, itemMode.item_id)}
    </div>
  );
}

export default BoardContent;
