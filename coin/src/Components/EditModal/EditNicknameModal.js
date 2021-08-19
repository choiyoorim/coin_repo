import React, { useState } from "react";
import "../EditModal/EditModal.css";
import axios from "axios";

const EditNicknameModal = (props) => {
  const { open, close, header } = props;
  const id = props.children;
  const [nickname, setNickname] = useState("");
  console.log(id);
  const nicknameChange = (event) => {
    console.log(event.currentTarget.value);
    setNickname(event.currentTarget.value);
  };

  const nicknameSumbit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/api/nicknamechange",
      data: {
        id: id,
        nickname: nickname,
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
            <form onSubmit={nicknameSumbit}>
              <input id="edit-input" onChange={nicknameChange}></input>
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

export default EditNicknameModal;
