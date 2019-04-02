import React, { Component } from 'react';
import Scorecard from './Components/Scorecard'
import Die from './Components/Die'
import Dice from './Components/Dice'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="mainDiv">
        
        <Scorecard/>
        <div className="diceContainer">
          <Dice/>
        </div>
      </div>
    );
  }
}

export default App;
