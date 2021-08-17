import React, { Component } from "react";

class FilterRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.optionValue,
    };
  }

  changeOption = (e) => {
    var val = e.target.value;
    this.setState(
      {
        value: val,
      },
      () => {
        this.props.changeOption(this.state.value);
      }
    );
  };

  render() {
    const valueArray = this.props.allOptions; //보드에서 넘어온 옵션 배열
    return (
      <div className="filter-options">
        <div className="filter-option">
          <select
            id="valuename"
            value={this.state.value}
            onChange={this.changeOption.bind(this)}
            style={{ height: 30, width: 80, borderRadius: 5, padding: 5 }}
          >
            {valueArray.map(function (rowData) {
              return (
                <option key={rowData.option_ID} value={rowData.option_ID}>
                  {rowData.option_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
export default FilterRead;
