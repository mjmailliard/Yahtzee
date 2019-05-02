import React, { Component } from 'react';
import './App.css';
//import Dice from './Components/Dice';
import Game from './Components/Game'
class App extends Component {
  render() {
    return (
      <div className="mainDiv">
        
        <Game />
 
      </div>
    );
  }
}

export default App;
