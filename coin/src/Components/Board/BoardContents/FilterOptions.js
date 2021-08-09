import React, { Component } from "react";

class FilterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.optionValue,
    };
  }

  changeOption = (type, e) => {
    var val = e.target.value;
    console.log("changeoption");
    console.log(val); //=== option id
    console.log(type); //==="read"
    this.setState(
      {
        value: val,
      },
      () => {
        this.props.changeOption(this.state.value, type);
      }
    );
  };

  render() {
    const valueArray = this.props.benderOptions;

    return (
      <div className="filter-options">
        <div className="filter-option">
          <select
            id="valuename"
            value={this.state.value}
            onChange={this.changeOption.bind(this, "value")}
            style={{ height: 30, width: 80, borderRadius: 5, padding: 5, position: "relative", right: 15 }}
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
