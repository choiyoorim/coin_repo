import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
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
import CalendarTest from "../../Pages/CalendarTest";

import { createOption } from "../../_action/optionAction";
import { useSelector, useDispatch } from "react-redux";

function BoardContent(props) {
  const boardRef = useRef(null);
  const itemRef = useRef(null);
  const [options, setoptions] = useState([]);
  const [contents, setcontents] = useState([]);
  const [selectedOpValue, setselectedOpValue] = useState({
    option_ID: 0,
    option_name: "All",
  });
  const [filteredItem, setfilteredItem] = useState(contents);
  const [hidden, sethidden] = useState(false);
  const [itemMode, setitemMode] = useState({ mode: "read", item_id: 0 });
  const dispatch = useDispatch();
  const option = useSelector((state) => state.option);

  useEffect(() => {
    let _option = option.data.filter(
      (rowData) => rowData.boards_board_ID === props.value
    );
    _option.unshift({
      option_ID: 0,
      option_name: "All",
      boards_board_ID: props.value,
    }); //맨 처음 옵션 프론트에만 추가
    setoptions(_option);
  }, []);
  console.log(options);

  // useEffect(() => {
  //   filterItems(selectedOpValue.id);
  // }, [contents]);

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
    while (i < options.length) {
      if (val === options[i].option_ID) {
        setselectedOpValue(options[i]); //현재 옵션 지정
        break;
      }
      i = i + 1;
    }
    // if (options[i].id !== 0) {
    //   setfilteredItem(
    //     contents.filter(function (item) {
    //       return item.option_id === options[i].id;   //아이템 필터링
    //     })
    //   );
    // } else {
    //   setfilteredItem(contents);
    // }
  };
  console.log(selectedOpValue);

  const modOption = (mode, value) => {
    let _options = options.concat();
    let _contents = contents.concat();

    switch (mode) {
      case "delete":
        setoptions(_options.filter((op) => op.id !== selectedOpValue.id));
        setselectedOpValue({ id: 0, value: "All" });
        setcontents(
          _contents.filter((co) => co.option_id !== selectedOpValue.id)
        );
        break;

      case "create":
        let body = {};
        // dispatch(createOption(body));
        setoptions(_options);
        break;

      case "update":
        var i = 0;
        while (i < _options.length) {
          if (_options[i].id === selectedOpValue.id) {
            _options[i] = {
              id: _options[i].id,
              value: value,
            };
            break;
          }
          i = i + 1;
        }
        setoptions(_options);
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
    var _contents = contents.concat();
    var i = 0;
    var editItem = {};
    while (i < _contents.length) {
      if (_id === _contents[i].id) {
        editItem = _contents[i];
        break;
      }
      i = i + 1;
    }

    if (_mode === "item-update") {
      article = (
        <ItemUpdate
          data={editItem}
          optionValue={editItem.option_id} //현재 옵션 전달 = 2
          allOptions={options} //옵션 배열 전달
          onSubmit={function (_option_id, _title, _link, _desc) {
            _contents[i] = {
              id: _id,
              option_id: _option_id,
              title: _title,
              link: _link,
              desc: _desc,
            };

            setitemMode({ mode: "read", item_id: null });
            setcontents(_contents);
          }}
        ></ItemUpdate>
      );
    } else if (_mode === "item-delete") {
      if (window.confirm("현재 아이템를 삭제합니다.")) {
        _contents.splice(i, 1);
        setcontents(_contents);
        setitemMode({ mode: "read", item_id: null });
        alert("삭제되었습니다.");
      }
    }
    return article;
  };

  const createItems = (_title, _link, _desc) => {
    let _contents = contents.concat();
    let lastIndex = 0;
    if (_contents.length !== 0) {
      lastIndex = _contents[_contents.length - 1].id + 1;
    }
    _contents.push({
      id: lastIndex,
      option_id: selectedOpValue.id,
      title: _title,
      link: _link,
      desc: _desc,
    });
    setcontents(_contents);
    sethidden(false);
  };

  const onCreateHandler = () => {
    sethidden(true);
  };
  //보드 삭제 기능

  const onRemove = (e) => {
    props.onClick(e.target.value);
  };

  return (
    <div className="boardcontent" ref={boardRef}>
      <button class="delete_board" value={props.value} onClick={onRemove}>
        &times;
      </button>
      <Resizer onResize={handleResize}></Resizer>
      <BoardInfo onDrag={handleDrag} text={props.text} />
      {props.text != "github" && props.text != "baekjoon" && (
        <>
          <div className="option-container">
            <FilterRead
              optionValue={selectedOpValue.id} //현재 옵션 전달
              allOptions={options} //전체 옵션
              changeOption={filterItems} //함수 처리
            />
            <MoreButton currOption={selectedOpValue} changeBoard={modOption} />
          </div>
          <div className="item-createtab" onClick={onCreateHandler}>
            내용 추가하기
          </div>
          {hidden && <ItemCreate onSubmit={createItems} />}
          <div className="item-container" ref={itemRef}>
            <ItemRead data={filteredItem} onChangeItem={changeItems} />
          </div>
        </>
      )}
      {props.text == "github" && (
        <div ref={itemRef}>
          <br /> <CalendarTest /> <br />
        </div>
      )}
      {props.text == "baekjoon" && (
        <div ref={itemRef}>
          <BoardBaek />
        </div>
      )}
      {itemMode.mode !== "read" && updateItems(itemMode.mode, itemMode.item_id)}
    </div>
  );
}

export default BoardContent;
