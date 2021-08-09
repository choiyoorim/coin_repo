import React, { Component } from "react";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";
import StyledModalDiv from "../StyledModalDiv";
import StyledModalArticle from "../StyledModalArticle";

class FilterCreate extends Component {
  render() {
    console.log("Content render");
    return (
      <StyledModalDiv>
        <div className="filter-modal">
          <StyledModalArticle>
            <article>
              <h2>Create</h2>
              <form
                action="/create_process"
                method="post"
                onSubmit={function (e) {
                  e.preventDefault();
                  this.props.onSubmit(e.target.title.value);
                }.bind(this)}
              >
                <p>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="title"
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
export default FilterCreate;
