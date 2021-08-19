import React, { Component } from "react";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";
import StyledModalDiv from "../StyledModalDiv";
import StyledModalArticle from "../StyledModalArticle";

class FilterUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _value: this.props.data.option_name,
      _id: this.props.data.option_ID,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({ _value: e.target.value });
    console.log(this.state._value);
  }
  render() {
    return (
      <StyledModalDiv>
        <div className="filter-modal">
          <StyledModalArticle>
            <article>
              <h2>Update</h2>
              <form
                action="/update_process"
                method="post"
                onSubmit={function (e) {
                  e.preventDefault();
                  this.props.onSubmit(this.state._value);
                }.bind(this)}
              >
                <input type="hidden" name="id" value={this.state._id}></input>
                <p>
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={this.state._value}
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
export default FilterUpdate;
