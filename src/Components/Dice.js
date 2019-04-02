import React, { Component, Fragment } from 'react'
import Die from './Die'


export default class Dice extends Component {
  constructor(){
    super()
    this.state = {
      die1: '',
      die2: '',
      die3: '',
      die4: '',
      die5: '',

    }
  }
  rollDie1() {

    return this.setState({die1: Math.ceil(Math.random() * 6)});
  }
  rollDie2() {

    return this.setState({die2: Math.ceil(Math.random() * 6)});
  }
  rollDie3() {

    return this.setState({die3: Math.ceil(Math.random() * 6)});
  }
  rollDie4() {

    return this.setState({die4: Math.ceil(Math.random() * 6)});
  }
  rollDie5() {

    return this.setState({die5: Math.ceil(Math.random() * 6)});
  }
  rollDice() {
    this.setState({die1: Math.ceil(Math.random() * 6)});
    this.setState({die2: Math.ceil(Math.random() * 6)});
    this.setState({die3: Math.ceil(Math.random() * 6)});
    this.setState({die4: Math.ceil(Math.random() * 6)});
    this.setState({die5: Math.ceil(Math.random() * 6)});

  }

  render() {
    return(
      <Fragment>
        <div>
          <div className="dieSize">
            {this.state.die1}
          </div>
          <button onClick={()=> this.rollDie1()}> roll </button>
        </div> 
        <div> 
          <div className="dieSize">
            {this.state.die2}
          </div>
          <button onClick={()=> this.rollDie2()}> roll </button>
        </div> 
        <div>
          <div className="dieSize"> 
            {this.state.die3}
          </div>
          <button onClick={()=> this.rollDie3()}> roll </button>
        </div>  
        <div>
          <div className="dieSize">
            {this.state.die4}
          </div>
          <button onClick={()=> this.rollDie4()}> roll </button>
        </div>  
        <div>
          <div className="dieSize"> 
            {this.state.die5}
          </div>
          <button onClick={()=> this.rollDie5()}> roll </button>
        </div>
        
        
        <button onClick={()=> this.rollDice()}> roll all </button>
        
        
      </Fragment>
    )
  }
}