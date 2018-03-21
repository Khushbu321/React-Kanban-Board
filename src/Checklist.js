import React from "react";
import './Checklist.css';
import classnames from 'classnames';

class Checklist extends React.Component{
  state = {
    inputValue: [],
    showTextBox: false,
  }

  listitem = () =>{
    return(
      <div className = "listItem">
       { this.state.showTextBox ?
         (this.generateInputBox()) :
         (<span className = "addAItem" onClick = {this.handleCheckListAddition}> Add a item... </span>)}
      </div>
    );
  }

  handleCheckListAddition = () =>{
    this.setState({
      showTextBox: true
    });
  }

  generateInputBox = () => {
    return (
       <form onSubmit = {this.handleInputChange}>
        <input type ="text" ref={(ref)=> ref && ref.focus()} className = "textBox" placeholder = "Start typing..."/>
        <input type="submit" value="Submit" className = "button"/>
       </form>
      );
  }

  handleInputChange = (e) => {
    e.preventDefault();
    var listItemName = e.target.children[0].value;
    if(listItemName){
      this.setState({
        inputValue:[...this.state.inputValue,listItemName],
        showTextBox: false,
      });
    }
  }

 checkedItem = (e) => {
   e.persist();
   var index = e.target.dataset.index;
   this.setState({
       [this.getCheckedKey(index)]: !this.state[this.getCheckedKey(index)]
   });
 }

 getCheckedKey = (index) => {
   return `checked-${index}` ;
 }

  renderCheck = () =>{
    return this.state.inputValue.map((val,index)=>{
      return (<li className = {classnames(this.state[this.getCheckedKey(index)] ? 'strikeThrough' : null)}>
                <label className="checkbox">
                <input type="checkbox" data-index = {index} onClick = {this.checkedItem}/>
                {val}
                </label>
              </li>);
    })
  }

   render(){
     // const a = this.state.inputValue;
     // const html = a.map((val) => <li><label className="checkbox"><input type="checkbox"/>{val}</label></li>);
     // const button = (<button>{   }</button>);
     /**
      React.createElement({
        tagName: 'button'
        children: val,
      })
     **/
     return (
       <div>
       <div className = "headingDialog">{this.props.heading}</div>
       <div>
       {this.listitem()}
       <ul className = "ul">
       { /*function calls, single statements execute */ }
       {this.renderCheck()}
       </ul>
       </div>
       </div>
     );
   }
}

export default Checklist;
