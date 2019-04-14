import React, { Component } from 'react';
import './App.css';
import Dice from './Components/Dice';

class App extends Component {
  render() {
    return (
      <div className="mainDiv">
        
        <Dice />
        
      </div>
    );
  }
}

export default App;
