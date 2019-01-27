import React, { Component } from 'react';
import Scorecard from './Components/Scorecard'
import Dice from './Components/Dice'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dice/>
        <Scorecard/>
      </div>
    );
  }
}

export default App;
