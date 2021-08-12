import React, { Component } from "react";
import FilterRead from "./FilterRead";
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
      _title: this.props.data.title,
      _link: this.props.data.link,
      _desc: this.props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
    this.changeOption = this.changeOption.bind(this);
  }

  inputFormHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  changeOption = (val) => {
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
                    this.state._option_id,
                    this.state._title,
                    this.state._link,
                    this.state._desc
                  );
                }.bind(this)}
              >
                <input type="hidden" name="id" value={this.state._id}></input>
                <div>
                  <FilterRead
                    optionValue={this.props.optionValue}
                    allOptions={this.props.allOptions}
                    changeOption={this.changeOption}
                  ></FilterRead>
                </div>
                <p>
                  <input
                    required
                    type="text"
                    name="_title"
                    placeholder="title"
                    value={this.state._title}
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
