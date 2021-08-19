import React, { Component } from "react";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";
import StyledModalDiv from "../StyledModalDiv";
import StyledModalArticle from "../StyledModalArticle";

class ItemCreateB extends Component {
  render() {
    return (
      <StyledModalDiv>
        <div className="create-item">
          <StyledModalArticle>
            <article>
              <h2>북마크 추가</h2>
              <form
                aciton="/createItem_process"
                method="post"
                onSubmit={function (e) {
                  e.preventDefault();
                  this.props.onSubmit(
                    e.target.title.value,
                    e.target.desc.value
                  );
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

                <p>
                  <input type="text" name="desc" placeholder="desc"></input>
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
export default ItemCreateB;
