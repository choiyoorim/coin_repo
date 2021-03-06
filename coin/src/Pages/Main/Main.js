import React,{useState,useRef, Component} from 'react';
import reactDom from 'react-dom';
import BoardContent from '../../Components/Board/BoardContent';
import BoardInfo from '../../Components/Board/BoardInfo';
import Menu from '../../Components/Menu';
import face from '../../img/face.PNG';
import { logoutUser } from '../../action/userAction';
import LogoutButton from '../../Components/LogoutButton';
import UserInfoId from '../../Components/UserInfoId';

const mainProfile = {
    width: '45px',
    height: '45px',
    borderRadius: '50%', 
    verticalAlign: 'middle',
};

class Main extends Component{

    constructor(props){
        super(props);
        this.id = 2;
        this.state={
            board: [
                {id:1,
                text:'github'
                }
            ],
        };
    }

    
    getBoardName = (data) =>{
        const {board} = this.state;
        this.setState({
            board: board.concat({id:this.id++,text:data})
        })
        console.log(this.id)
    }

    render(){
        const titleList = this.state.board.map(name => 
            <BoardContent key = {name.id} text = {name.text}>
            </BoardContent>)

        return(
            <>
                <div style={{display: 'inline-block', float: 'right', margin: '5px 20px 0px 0px'}} ondrop = "return false" ondragover="return false">
                    <img src={face} alt="여기요" style={mainProfile}/>
                    <span>
                        <UserInfoId></UserInfoId>
                        <LogoutButton></LogoutButton>
                    </span>
                </div>

                <div>{titleList}</div>                  
                <Menu getBoardName={this.getBoardName}></Menu>
                
            </>
        );
    }
    
}

export default Main;
