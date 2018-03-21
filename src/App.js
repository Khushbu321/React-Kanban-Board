import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Body from "./Body";

class App extends Component {
  render() {
    return (
      <div className = "main" >
        <Header  className = "header"/>
        <Body  className = "body"/>
      </div>
    );
  }
}

export default App;
