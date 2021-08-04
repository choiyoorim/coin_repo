import React, { Component } from "react";
import FilterOptions from "./FilterOptions";
import CancelButton from "../CancelButton";

import SubmitButton from "../SubmitButton";
import StyledModalDiv from "../StyledModalDiv";
import StyledModalArticle from "../StyledModalArticle";

class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.data.id,
      _option_id: this.props.data.option_id,
      _link: this.props.data.link,
      _name: this.props.data.name,
      _desc: this.props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
    this.changeOption = this.changeOption.bind(this);
  }

  inputFormHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  changeOption = (val, type) => {
    this.setState({
      _option_id: parseInt(val),
    });
  };

  render() {
    return (
      <StyledModalDiv>
        <div className="item-modal">
          <StyledModalArticle>
            <article>
              <h2>Update Item</h2>
              <form
                action="/updateItem_process"
                method="post"
                onSubmit={function (e) {
                  e.preventDefault();
                  console.log("on submit");
                  console.log(this.state._option_id);
                  this.props.onSubmit(
                    this.state._id,
                    this.state._option_id,
                    this.state._name,
                    this.state._link,
                    this.state._desc
                  );
                }.bind(this)}
              >
                <input type="hidden" name="id" value={this.state._id}></input>
                <div>
                  <FilterOptions
                    optionValue={this.props.optionValue}
                    benderOptions={this.props.benderOptions}
                    changeOption={this.changeOption}
                  ></FilterOptions>
                </div>
                <p>
                  <input
                    type="text"
                    name="_name"
                    placeholder="title"
                    value={this.state._name}
                    onChange={this.inputFormHandler}
                  ></input>
                </p>
                <p>
                  <input
                    type="text"
                    name="_link"
                    placeholder="url"
                    value={this.state._link}
                    onChange={this.inputFormHandler}
                  ></input>
                </p>
                <p>
                  <input
                    type="text"
                    name="_desc"
                    placeholder="desc"
                    value={this.state._desc}
                    onChange={this.inputFormHandler}
                  ></input>
                </p>

                <div
                  className="button-set"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <CancelButton />
                  <SubmitButton />
                </div>
              </form>
            </article>
          </StyledModalArticle>
        </div>
      </StyledModalDiv>
    );
  }
}

export default ItemUpdate;
