import React, { useState } from "react";
import "../EditModal/EditModal.css";
import axios from "axios";
const EditEmailModal = (props) => {
  const { open, close, header } = props;
  const id = props.children;
  const [email, setEmail] = useState("");
  console.log(id);
  const emailChange = (event) => {
    console.log(event.currentTarget.value);
    setEmail(event.currentTarget.value);
  };
  const emailSumbit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/emailchange",
      data: {
        id: id,
        email: email,
      },
    }).then((res) => {
      if (res.data.success) {
        alert("수정 완료");
      } else {
        console.log("오류");
      }
    });
  };
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section class="sectionChange">
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <h2 id="edit-content-input">변경할 내용 입력 : </h2>
            <form onSubmit={emailSumbit}>
              <input id="edit-input" onChange={emailChange}></input>
              <button id="edit-check" type="submit">
                제출
              </button>
            </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};
export default EditEmailModal;
