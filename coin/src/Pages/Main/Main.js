import React,{useState,useRef, Component} from 'react';
import reactDom from 'react-dom';
import BoardContent from '../../Components/Board/BoardContent';
import BoardInfo from '../../Components/Board/BoardInfo';
import Menu from '../../Components/Menu';



class Main extends Component{

    constructor(props){
        super(props);
        this.id = 2;
        this.state={
            board: [
                {id:1,
                text:'github'
                }
            ]
        }
    }

    
    parentFunction = (data) =>{
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
                <div>{titleList}</div>                  
                <Menu parentFunction={this.parentFunction}></Menu>
            </>
        );
    }
    
}

export default Main;
