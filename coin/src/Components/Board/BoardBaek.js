import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import Resizer from "./Resizer";
import { Direction } from "./Direction";
import "./BoardContent.css";
import BoardInfo from "./BoardInfo";

import FilterRead from "./BoardContents/FilterRead";

import ItemRead from "./BoardContents/ItemRead";
import ItemCreate from "./BoardContents/ItemCreate";
import ItemUpdate from "./BoardContents/ItemUpdate";

function BoardBaek(props){
  const boardRef = useRef(null);
  const itemRef = useRef(null);
  const [optionsBaek, setoptionsBaek] = useState([{id: 0, value: "All"},{id: 1, value: "내가 풀 문제"}, {id: 2, value: "내가 맞은 문제"}, {id: 3, value: "내가 틀린 문제"}, {id: 4, value: "만점이 아닌 문제"}])
  const [contentsBaek, setcontentsBaek] = useState([]);

  const [selectedOpValueBaek, setselectedOpValueBaek] = useState({
      id: 0,
      value: "내가 풀 문제",
    })

  const [filteredItemBaek, setfilteredItemBaek] = useState(contentsBaek);

  const [hidden, sethidden] = useState(false);
  const [itemMode, setitemMode] = useState({ mode: "read", item_id: 0 });
    
  useEffect(() => {
    filterItems(selectedOpValueBaek.id);
  }, [contentsBaek]);
    
  const filterItems = (val) => {
    val = parseInt(val);       
    let i = 0;
    while (i < optionsBaek.length) {
      if (val === optionsBaek[i].id) {
        setselectedOpValueBaek(optionsBaek[i]);
        break;
      }  
      i = i + 1;
    }
    
    if (optionsBaek[i].id !== 0) {
      setfilteredItemBaek(
        contentsBaek.filter(function (item) {  
          return item.option_id === optionsBaek[i].id;
        })
      );
    } 
    else {
      setfilteredItemBaek(contentsBaek);
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
    
    var _contents = contentsBaek.concat();
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
          allOptions={optionsBaek} //옵션 배열 전달
          onSubmit={function (_option_id, _title, _link, _desc) {
            _contents[i] = {
              id: _id,
              option_id: _option_id,
              title: _title,
              link: _link,
              desc: _desc,
            };
    
            setitemMode({ mode: "read", item_id: null });
              setcontentsBaek(_contents);
          }}
        ></ItemUpdate>
      );
    } else if (_mode === "item-delete") {
      if (window.confirm("현재 아이템를 삭제합니다.")) {
        _contents.splice(i, 1);
        setcontentsBaek(_contents);
        setitemMode({ mode: "read", item_id: null });
        alert("삭제되었습니다.");
      }
    }

    return article;
  };
    
  const createItems = (_title, _link, _desc) => {
    let _contents = contentsBaek.concat();
    let lastIndex = 0;
    if (_contents.length !== 0) {
      lastIndex = _contents[_contents.length - 1].id + 1;
    }
    _contents.push({
      id: lastIndex,
      option_id: selectedOpValueBaek.id,
      title: _title,
      link: _link,
      desc: _desc,
    });
    setcontentsBaek(_contents);
    sethidden(false);
  };
    
  const onCreateHandler = () => {
    sethidden(true);
  };
  return(
    <>
      <div className="option-container">
        <FilterRead
          optionValue={selectedOpValueBaek.id} //현재 옵션 전달
          allOptions={optionsBaek} //전체 옵션
          changeOption={filterItems} //함수 처리
        />
      </div>
      <div className="item-createtab" onClick={onCreateHandler}>
        내용 추가하기
      </div>
      {hidden && <ItemCreate onSubmit={createItems} />}
      <div className="item-container" ref={itemRef}>
        <ItemRead data={filteredItemBaek} onChangeItem={changeItems} />
      </div>
    </>
      );
}

export default BoardBaek;