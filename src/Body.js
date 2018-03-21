import React from "react";
import Card from "./Card";
import Button from "./Button";
import './Body.css';

class Body extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: JSON.parse(localStorage.getItem('cards')) || [],
      showDialog: false
    }
  }

  generateDialog = () => {
    return (
      <div className = "inputDialog">
      <form onSubmit = {this.handleCardAddition}>
      <input type ="text"  className = "textBox" placeholder = "Start typing..."/>
      <input type="submit" value="Submit"  className = "button"/>
      <div onClick = {this.closeDialog} className="closeDialog">X</div>
      </form>
      </div>);
  }

//ref={(ref)=> ref && ref.focus()}
  closeDialog = (e) => {
    this.setState({
     showDialog: false
    });
  }

  handleCardAddition = (e)=>{
    e.preventDefault();
    const data = e.target.children[0].value;
    if(data){
      this.setState({
        card: [...this.state.card,data],
      }, () => {
        localStorage.setItem("cards",JSON.stringify(this.state.card));
      });
    }
  }

  handleClick = () => {
    this.setState({
      showDialog: true
    });
  }

  render(){
    return (
    <div className="card-container">
      {this.state.card.map((card, index)=>{
          return (<Card cardName = {card} key = {index} cardIndex={index} />);
      })}
        {this.state.showDialog ? this.generateDialog() : null}
      <Button  className = "addButton"   onClick = {this.handleClick}>+
      </Button>
    </div>
    );
  }
}
export default Body;
