import React, {useState, useEffect, useRef} from "react";
import styled from 'styled-components';

const TextInputBlock = styled.div`
    width:720px;
    height:40px;

    position:relative;
    left: 90px;
    top:20px;
    background: #cfdce8;
    border-radius: 20px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);
    margin-bottom:20px;

    .text-box{
        position:relative;
        left:20px;
        top:10px;
    }
`;

const LastTextInputBlock = styled.div`
    width:720px;
    height:40px;

    position:relative;
    left: 90px;
    top:20px;
    background: #cfdce8;
    border-radius: 20px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.04);
    margin-bottom:80px;

    .text-box{
        position:relative;
        left:20px;
        top:10px;
    }
`


function TextInput({ init }){
    const ref=useRef(null);
    const [text,setText] = useState(init);
    console.log(text);
    const [editable,setEditable] = useState(false);

    const editOn = () =>{
        setEditable(true);
    };
    const handleChange = (e) =>{
        setText(e.target.value);
    };
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            setEditable(!editable);
        }
    };
    const handleClickOutside=(e)=>{
        if(editable==true && !ref.current.contains(e.target)) setEditable(false);
    };
    useEffect(()=>{
        window.addEventListener("click",handleClickOutside,true);
    });

    return(
        <TextInputBlock>
            <div className="text-box" ref={ref}>
                {editable ? (<input type="text" value={text} onChange={(e)=>handleChange(e)} onKeyDown={handleKeyDown} />
                ) : (
                <div onClick={()=>editOn()}>{text}</div>
                )}
            </div>
        </TextInputBlock>
    )
}

export default TextInput;