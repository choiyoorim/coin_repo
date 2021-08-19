import React, { useState } from "react";
import "../EditModal/EditModal.css";
import axios from "axios";
const EditBaekjoonModal = (props) => {
  const { open, close, header } = props;
  const id = props.children;
  const [baekjoonId, setBaekjoonId] = useState("");
  console.log(id);
  const baekjoonIdChange = (event) => {
    console.log(event.currentTarget.value);
    setBaekjoonId(event.currentTarget.value);
  };
  const baekjoonIdSumbit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/baekjoonchange",
      data: {
        id: id,
        baekjoonId: baekjoonId,
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
            <form onSubmit={baekjoonIdSumbit}>
              <input id="edit-input" onChange={baekjoonIdChange}></input>
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
export default EditBaekjoonModal;
