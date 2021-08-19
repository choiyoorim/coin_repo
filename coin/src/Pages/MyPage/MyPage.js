import React, {useState, useEffect} from "react";
import {createGlobalStyle} from "styled-components";
import InfoTemplate from "../../Components/InfoTemplate";
import ProfilePic from "../../Components/ProfilePic";
import Profile from "../../Components/Profile";
import InfoChangeTemplate from "../../Components/InfoChangeTemplate";
import TextInput from "../../Components/TextInput";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {useReducer} from "react";
//회원정보 가져오는데 사용할 것
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getUserinfo} from "../../action/userAction";
import axios from "axios";
import styled from "styled-components";
import EditGithubModal from "../../Components/EditModal/EditGithubModal";
import EditBaekjoonModal from "../../Components/EditModal/EditBaekjoonModal";
import EditEmailModal from "../../Components/EditModal/EditEmailModal";
import EditNicknameModal from "../../Components/EditModal/EditNicknameModal";

const GlobalStyle = createGlobalStyle`
    body{
        background: #cfdce8;
    }
    .profileForm{
      justify-content: center;
      align-items: center;
    }

    h2{
        width:500px;
        color:#354356;
        position:relative;
        top:20px;
        left:80px;
    }
    #editpw-box{
        position:relative;
        top:70px;
    }


    .last-box{
        margin-bottom:60px;
    }
    .check-box{
        float:right;
        position:relative;
        right:85px;
        bottom:20px;
    }

    #email-box{
        position:relative;
        top:70px;
    }
    #last-box{
        position:relative;
        top:70px;
        right:20px;
    }
    h3{
        float:right;
        position:relative;
        right:80px;
        bottom:43px;
    }
    .withdraw-button{
        width:100px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        position:relative;
        float:right;
        top:10px;
        right:75px;
        font-size:15px;
    }
    .withdraw-button:hover{
        background-color:#6C8BA7;
    }
    .editpw-button{
        width:130px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        position:relative;
        float:right;
        right:75px;
        top:20px;
        font-size:15px;
    }
    .editpw-button:hover{
        background-color:#6C8BA7;
    }
    #edit-check{
        width:100px;
        height:30px;
        background-color: #cfdce8;
    }
    
    #check-block{
        position:relative;
        top:40px;
    }
    .id-inst{
      position:relative;
      left:10px;
    }
    .go-to-main{
      width:160px;
      height:30px;
      background-color: #cfdce8;
      border-radius: 10px;
      display:inline-block;
      border:0;
      outline:0;
      font-size:15px;
      position:relative;
      top:200px;
      right:25px;
      }

    .go-to-main:hover{
      background-color:#6C8BA7;
  }
    .editprofile-button1{
        width:100px;
        height:30px;
        background-color: #cfdce8;
        border-radius: 10px;
        text-align:center;
        display:inline-block;
        border:0;
        outline:0;
        font-size:15px;
        position:relative;
        right:75px;
        bottom:30px;
        float:right;
    }

    .editprofile-button1:hover{
      background-color:#6C8BA7;
  }

  .editprofile-button2{
    width:100px;
    height:30px;
    background-color: #cfdce8;
    border-radius: 10px;
    text-align:center;
    display:inline-block;
    border:0;
    outline:0;
    font-size:15px;
    position:relative;
    right:75px;
    bottom:30px;
    float:right;
}

  .editprofile-button2:hover{
    background-color:#6C8BA7;
  }

  .editprofile-button3{
    width:100px;
    height:30px;
    background-color: #cfdce8;
    border-radius: 10px;
    text-align:center;
    display:inline-block;
    border:0;
    outline:0;
    font-size:15px;
    position:relative;
    right:75px;
    bottom:30px;
    float:right;
  }

  .editprofile-button3:hover{
  background-color:#6C8BA7;
  }

  .editprofile-button4{
    width:100px;
    height:30px;
    background-color: #cfdce8;
    border-radius: 10px;
    text-align:center;
    display:inline-block;
    border:0;
    outline:0;
    font-size:15px;
    position:relative;
    right:75px;
    bottom:30px;
    float:right;
  }

  .editprofile-button4:hover{
  background-color:#6C8BA7;
  }

`;

const TextBlock = styled.div`
  width: 720px;
  height: 40px;

  position: relative;
  left: 90px;
  top: 20px;
  background: #cfdce8;
  border-radius: 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  padding-top: 10px;
  padding-left: 20px;
  .text-box {
    position: relative;
    left: 20px;
    top: 10px;
  }

  .editprofile-button4 {
    width: 100px;
    height: 30px;
    background-color: #cfdce8;
    border-radius: 10px;
    text-align: center;
    display: inline-block;
    border: 0;
    outline: 0;
    font-size: 15px;
    position: relative;
    right: 75px;
    bottom: 30px;
    float: right;
  }

  .editprofile-button4:hover {
    background-color: #6c8ba7;
  }
`;

function MyPage() {
  const [Email, setEmail] = useState("");
  const [Nickname, setNickname] = useState("");
  const [GitId, setGitId] = useState("");
  const [BaekjoonId, setBaekjoonId] = useState("");
  const [state, setState] = useState("");
  const {id} = useSelector((state) => ({
    id: state.user.Id,
  }));
  const [modalGitOpen, setModalGitOpen] = useState(false);
  const [modalBaekjoonOpen, setModalBaekjoonOpen] = useState(false);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const [modalNicknameOpen, setModalNicknameOpen] = useState(false);

  const openGitModal = () => {
    setModalGitOpen(true);
  };

  const closeGitModal = () => {
    setModalGitOpen(false);
    window.location.reload();
  };

  const openBaekjoonModal = () => {
    setModalBaekjoonOpen(true);
  };

  const closeBaekjoonModal = () => {
    setModalBaekjoonOpen(false);
    window.location.reload();
  };

  const openEmailModal = () => {
    setModalEmailOpen(true);
  };

  const closeEmailModal = () => {
    setModalEmailOpen(false);
    window.location.reload();
  };

  const openNicknameModal = () => {
    setModalNicknameOpen(true);
  };

  const closeNicknameModal = () => {
    setModalNicknameOpen(false);
  };

  if ({id}.id != undefined) {
    console.log({id});
  }

  useEffect(() => {
    if ({id}.id != undefined) {
      let body = {
        id: {id}.id,
      };
      console.log(body);
      console.log(state);

      axios({
        method: "post",
        url: "/api/userinfo",
        data: {
          id: body.id,
        },
      }).then(function (response) {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("userId", body.id);
          console.log("되는거니..?");
          setEmail(response.data.email);
          setNickname(response.data.nickname);
          setGitId(response.data.gitId);
          setBaekjoonId(response.data.baekjoonId);
          setState("fix");
        }
      });
    }
  }, [state]);

  useEffect(() => {
    setTimeout(function () {
      console.log("시간지남");
      setState("pass");
    }, 5000);
  }, []);

  if (state === "fix") {
    return (
      <>
        <GlobalStyle />
        <div class="profileForm">
          <InfoTemplate>
            <ProfilePic />
            <Profile />
          </InfoTemplate>

          <InfoChangeTemplate>
            <React.Fragment>
              <h2>GIT 계정</h2>
              <button className="editprofile-button1" onClick={openGitModal}>
                수정하기
              </button>
              <EditGithubModal
                open={modalGitOpen}
                close={closeGitModal}
                header="GIT 계정 수정하기"
              >
                {id}
              </EditGithubModal>
              <TextBlock>{GitId}</TextBlock>
              <h2>BAEKJOON 계정</h2>
              <button
                className="editprofile-button2"
                onClick={openBaekjoonModal}
              >
                수정하기
              </button>
              <EditBaekjoonModal
                open={modalBaekjoonOpen}
                close={closeBaekjoonModal}
                header="BAEKJOON 계정 수정하기"
              >
                {id}
              </EditBaekjoonModal>
              <TextBlock>{BaekjoonId}</TextBlock>
              <h2>이메일</h2>
              <button className="editprofile-button3" onClick={openEmailModal}>
                수정하기
              </button>
              <EditEmailModal
                open={modalEmailOpen}
                close={closeEmailModal}
                header="이메일 수정하기"
              >
                {id}
              </EditEmailModal>
              <TextBlock>{Email}</TextBlock>
              <h2>닉네임</h2>
              <button
                className="editprofile-button4"
                onClick={openNicknameModal}
              >
                수정하기
              </button>
              <EditNicknameModal
                open={modalNicknameOpen}
                close={closeNicknameModal}
                header="닉네임 수정하기"
              >
                {id}
              </EditNicknameModal>
              <TextBlock>{Nickname}</TextBlock>
            </React.Fragment>
            <h2 id="editpw-box">비밀번호 수정</h2>
            <Link to="/sendmail">
              <button className="editpw-button">비밀번호 수정</button>
            </Link>
            <h2 id="last-box">탈퇴하기</h2>
            <Link to="/quit">
              <button className="withdraw-button">탈퇴하기</button>
            </Link>
          </InfoChangeTemplate>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>loading중</h1>
      </>
    );
  }
}

export default MyPage;
