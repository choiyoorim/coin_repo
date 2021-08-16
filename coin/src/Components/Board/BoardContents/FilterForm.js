import React, { Component } from "react";

import FilterItems from "./FilterItems";
import FilterOptions from "./FilterOptions";
import FilterControl from "./FilterControl";
import FilterCreate from "./FilterCreate";
import FilterUpdate from "./FilterUpdate";
import ItemCreate from "./ItemCreate";
import ItemUpdate from "./ItemUpdate";
import MoreButton from "../MoreButton";

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.max_option_id = 2;
    this.max_item_id = 5;
    this.state = {
      mode: "read",
      value: 0,
      itemValue: 0,

      isToggleOn: false,
      optionModalOn: false,
      creatable: false,

      options: this.props.data,
      contents: this.props.content,
    };
    this.onCreateHandler = this.onCreateHandler.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
    this.changeItems = this.changeItems.bind(this);
  }

  filterItems = (val, type) => {
    val = parseInt(val);
    console.log(type);
    switch (type) {
      case "value":
        this.setState({ value: val });
        break;
      default:
        this.setState({ value: 0 });
        break;
    }
  };

  changeItems = (_id, _mode) => {
    _id = parseInt(_id);

    console.log(this.state.mode);
    if (_mode === "item-delete") {
      if (window.confirm("현재 북마크를 삭제합니다.")) {
        var _contents = Array.from(this.state.contents);

        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents.splice(i, 1);
            break;
          }
          i = i + 1;
        }

        this.setState({
          mode: "read",
          contents: _contents,
        });
        alert("삭제되었습니다.");
      }
    } else {
      this.setState({
        itemValue: _id,
        mode: _mode,
      });
    }
    //변경하는 컴포넌트, 내부 함수로 적용, setState로 전체 배열 적용
  };

  onCreateHandler() {
    this.setState({
      creatable: !this.state.creatable,
    });
  }

  onEditHandler = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  };

  createItem() {
    const article = (
      <ItemCreate
        onSubmit={function (_title, _link, _desc) {
          this.max_item_id = this.max_item_id + 1;
          var _contents = Array.from(this.state.contents);
          _contents.push({
            id: this.max_item_id,
            option_id: this.state.value,
            name: _title,
            link: _link,
            desc: _desc,
          });

          this.setState({
            contents: _contents,
            creatable: false,
            mode: "read",
          });
        }.bind(this)}
      />
    );
    return article;
  }

  getContent(selectedValue) {
    var _article = null;

    if (this.state.mode === "item-update") {
      var _contents = Array.from(this.state.contents);
      var i = 0;
      while (i < _contents.length) {
        if (this.state.itemValue === _contents[i].id) {
          var editItem = _contents[i];
          break;
        }
        i = i + 1;
      }

      _article = (
        <ItemUpdate
          data={editItem}
          optionValue={this.state.value} //현재 옵션 전달 = 2
          benderOptions={this.state.options} //옵션 배열 전달
          onSubmit={function (_id, _option_id, _name, _link, _desc) {
            _contents[i] = {
              id: _id,
              option_id: _option_id,
              name: _name,
              link: _link,
              desc: _desc,
            };

            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></ItemUpdate>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <FilterCreate
          onSubmit={function (_title) {
            this.max_option_id = this.max_option_id + 1;

            var _contents = Array.from(this.state.options);
            _contents.push({
              id: this.max_option_id,
              value: _title,
            });

            this.setState({
              options: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></FilterCreate>
      );
    } else if (this.state.mode === "update") {
      // console.log(this.state.value); //해당 옵션 value(1)
      // console.log(this.state.data); ->options //전체 배열
      var index = this.state.value;
      var _content = selectedValue;

      _article = (
        <FilterUpdate
          data={_content}
          onSubmit={function (_value) {
            var _contents = Array.from(this.state.options);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === index) {
                _contents[i] = {
                  id: _contents[i].id,
                  value: _value,
                };
                break;
              }
              i = i + 1;
            }

            this.setState({
              options: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></FilterUpdate>
      );
    }
    return _article;
  }

  editOption(selectedValue) {
    const article = (
      <FilterControl
        onChangeMode={function (_mode) {
          if (_mode === "delete") {
            if (this.state.value === 0) {
              alert("현재 옵션은 삭제할 수 없습니다.");
            } else if (
              window.confirm(
                `${selectedValue.value} 안의 모든 데이터가 삭제됩니다.`
              )
            ) {
              var _options = Array.from(this.state.options);
              var _contents = Array.from(this.state.contents);

              var i = 0;
              while (i < _options.length) {
                if (_options[i].id === this.state.value) {
                  _options.splice(i, 1);
                  i = 0;
                  break;
                }
                i = i + 1;
              }
              while (i < _contents.length) {
                if (_contents[i].option_id === this.state.value) {
                  _contents.splice(i, 1);
                }
                i = i + 1;
              }

              this.setState({
                mode: "read",
                options: _options,
                contents: _contents,
                value: 0,
              });
              alert("deleted!");
            }
          } else {
            this.setState((prevState) => ({
              mode: _mode,
              optionModalOn: !prevState.optionModalOn,
            }));
          }
          this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn,
          }));
        }.bind(this)}
        // 외부 클릭 감지 추가하기
      />
    );
    return article;
  }

  render() {
    var filteredItems = this.state.contents;
    var selectedID = this.state.value;

    var i = 0;
    var selectedValue = {};
    while (i < this.state.options.length) {
      if (selectedID === this.state.options[i].id) {
        selectedValue = this.state.options[i];
        break;
      }
      i = i + 1;
    }

    if (selectedID !== 0) {
      filteredItems = filteredItems.filter(function (item) {
        return item.option_id === selectedID;
      });
    }

    return (
      <div className="container">
        {/* options header */}
        <div
          className="option-container"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderBottom: "2px solid #a9c5de",
          }}
        >
          {/* DropDown */}
          <FilterOptions
            optionValue={this.state.value} //현재 옵션 전달 = 2
            benderOptions={this.state.options} //옵션 배열 전달
            changeOption={this.filterItems} //함수 처리
          />
          {/* edit button */}
          <MoreButton onClick={this.onEditHandler} />
        </div>

        {/* edit */}
        {this.state.isToggleOn ? this.editOption(selectedValue) : null}
        <br />

        {/* showItems */}
        <div className="item-container">
          <div className="item-create">
            {/* 내용 추가 버튼 */}
            <div
              className="item-createtab"
              onClick={this.onCreateHandler}
              style={{
                cursor: "pointer",
                backgroundColor: "#f9fbfd",
                padding: "10px 10px 8px 10px",
                borderBottom: "2px solid #a9c5de",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              내용 추가하기
            </div>
            {this.state.creatable ? this.createItem() : null}
          </div>
          {<FilterItems data={filteredItems} onChangeItem={this.changeItems} />}
          {this.getContent(selectedValue)}
        </div>
      </div>
    );
  }
}

export default FilterForm;
