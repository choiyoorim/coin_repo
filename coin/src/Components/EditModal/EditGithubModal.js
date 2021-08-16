import React,{useState} from 'react';
import '../EditModal/EditModal.css'
import axios from "axios";

const EditGithubModal = (props) =>{
    const {open,close,header} = props;
    const id = props.children;
    const [gitId,setGitId] = useState("")
    console.log(id);
    const gitIdChange = (event) =>{
        console.log(event.currentTarget.value);
        setGitId(event.currentTarget.value);
      } 

    const gitIdSumbit = (event) =>{
        event.preventDefault();
    
        axios({
            method:'post',
            url:'/api/gitchange',
            data:{
                id:id,
                gitId:gitId,
            }
        }).then((res)=>{
          if(res.data.success){
            alert('수정 완료')
          }
          else{
            console.log('오류')
          }
        })
      }

    return(
        <div className = {open? 'openModal modal':'modal'}>
            {open ?(
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <h2 id="edit-content-input">변경할 내용 입력 : </h2> 
                        <form onSubmit={gitIdSumbit}>
                            <input id="edit-input" onChange={gitIdChange}></input>
                            <button id="edit-check" type="submit">제출</button>
                        </form>
                    </main>
                </section>
            ):null}
        </div>
    )
}

export default EditGithubModal