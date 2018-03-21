import React from "react";
import Checklist from './Checklist';

import './Card.css';

function Heading(props) {
  return (
    <div>
      <div className = {props.className}>{props.cardName}</div>
    </div>
  );
}

class ItemCard extends React.Component{
  state = {
    savedItemCard: true,
    showDialog: false,
    inputValue: ''
  }

  handleCardAddition = () =>{
    this.setState({
      showDialog: true
    });
  }

  generateDialog = () => {
    return (
       <form onSubmit = {this.handleInputChange}>
        <input type ="text" ref={(ref)=> ref && ref.focus()} className = "textBox" placeholder = "Start typing..." />
        <input type="submit" value="Submit" className = "button"/>
       </form>);
  }

  handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.children[0].value);
    var itemName = e.target.children[0].value;
    if(itemName){
      this.setState({
        inputValue: itemName,
        showDialog: false
      },() => {
        this.handleClick();
      })
    }
  }

  handleClick = () => {
    this.props.onClick(this.state.inputValue);
    this.setState({
      inputValue: '',
    })
  }

  render(){
    return (
      <div className="itemCard">
        {this.state.showDialog ?
        (this.generateDialog()) :
        (<span className = "addACard" onClick = {this.handleCardAddition}>Add a card...</span>)}
      </div>
    );
  }
}


class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem(`${props.cardName}-items`)) || [],
      isModalOpen: false,
    }
  }

  handleAddButtonClick = (data) => {
    console.log(data);
    this.setState({
      items: [...this.state.items, data],
    },()=>{
      localStorage.setItem(`${this.props.cardName}-items`, JSON.stringify(this.state.items));
    });
  }

  renderDialog = () => {
  return (
      <div className = "dialog">
      <Checklist checklistUniqueId={this.state.showDialog} heading = {this.state.showDialog}/>
      <div onClick = {this.closeDialog} className="closeDialog">X</div>
      </div>
    );
  }

  closeDialog = (e) => {
    this.setState({
      showDialog: ' ',
      isModalOpen: false,
    });
  }

  createDialog = (e) => {
    const itemContent = e.target.dataset.value;
    this.setState({
      showDialog: itemContent,
      isModalOpen: true,
    });
  }


  onDragOver = (event) => {
    event.preventDefault();
  }

  drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log(data);
    this.domItemWrapper.appendChild(document.querySelector(`[data-value=${data}]`));
  }

  drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.dataset.value);
  }

  savedItemCard = (item) =>{
    return (
     <div draggable onDragStart={this.drag} className="savedItemCard" onDoubleClick = {this.createDialog} data-value={item} >
     {item}</div>
    );
  }

  getReference = (domElement) => {
    this.domItemWrapper = domElement;
  }

  render() {
    return (
      <div className="card" onDrop={this.drop} onDragOver={this.onDragOver}>
        {this.state.isModalOpen ? this.renderDialog(): null}
        <Heading className = "heading" cardName = {this.props.cardName}/>
        <div className="itemWrapper" ref={this.getReference}>
        { this.state.items.map((item) => {
          return (this.savedItemCard(item))
          })
        }
        </div>
        <ItemCard onClick = {this.handleAddButtonClick} />
      </div>
    );
  }
}

export default Card;
