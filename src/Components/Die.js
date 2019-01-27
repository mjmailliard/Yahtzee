import React, { Component } from 'react'
import '../App.css'

export default class Die extends Component {
  constructor(){
    super()
    this.state = {
      dieRoll: '',
    }
  }

  rollDie() {

    return this.setState({dieRoll: Math.ceil(Math.random() * 6)});
  }
   
  render() {
    return (
      <div>
        <div className="dieSize">
          {this.state.dieRoll}
        </div>
        <button onClick={()=> this.rollDie()}> roll </button>
      </div>
    )
  }
}

