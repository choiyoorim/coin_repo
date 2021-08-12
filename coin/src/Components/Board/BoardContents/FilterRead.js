import React, { Component } from "react";

class FilterOptions extends Component {
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
    const valueArray = this.props.allOptions;

    return (
      <div className="filter-options">
        <div className="filter-option">
          <select
            id="valuename"
            value={this.state.value}
            onChange={this.changeOption.bind(this)}
            style={{ height: 30, width: 80, borderRadius: 5, padding: 5 }}
          >
            {valueArray.map(function (option) {
              return (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
export default FilterOptions;
