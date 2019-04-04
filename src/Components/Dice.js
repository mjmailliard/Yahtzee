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
      die1Locked: false,
      die2Locked: false,
      die3Locked: false,
      die4Locked: false,
      die5Locked: false,

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
    if (this.state.die1Locked === false ) { 
      this.setState({die1: Math.ceil(Math.random() * 6)})
    }
    if (this.state.die2Locked === false ) { 
    this.setState({die2: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die3Locked === false ) { 
    this.setState({die3: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die4Locked === false ) { 
    this.setState({die4: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die5Locked === false ) { 
    this.setState({die5: Math.ceil(Math.random() * 6)});
    }

  }

  render() {
    return(
      <Fragment>
        <div>
          <div className="dieSize">
            {this.state.die1}
          </div>
          <button onClick={()=> this.rollDie1()}> roll </button>
          <input type="checkbox" onChange={e => this.setState(prevState => ({die1Locked: !prevState.die1Locked}))} id='die1' name='die1' value='locked'/>
        </div> 
        <div> 
          <div className="dieSize">
            {this.state.die2}
          </div>
          <button onClick={()=> this.rollDie2()}> roll </button>
          <input type="checkbox" id='die2' name='die2' value='locked' onChange={e => this.setState(prevState => ({die2Locked: !prevState.die2Locked}))}/>
     </div> 
        <div>
          <div className="dieSize"> 
            {this.state.die3}
          </div>
        <button onClick={()=> this.rollDie3()}> roll </button>
        <input type="checkbox" id='die3' name='die3' value='locked' onChange={e => this.setState(prevState => ({die3Locked: !prevState.die3Locked}))}/>
        </div>  
        <div>
          <div className="dieSize">
            {this.state.die4}
          </div>
          <button onClick={()=> this.rollDie4()}> roll </button>
          <input type="checkbox" id='die4' name='die4' value='locked' onChange={e => this.setState(prevState => ({die4Locked: !prevState.die4Locked}))}/>
      </div>  
        <div>
          <div className="dieSize"> 
            {this.state.die5}
          </div>
          <button onClick={()=> this.rollDie5()}> roll </button>
          <input type="checkbox" id='die5' name='die5' value='locked' onChange={e => this.setState(prevState => ({die5Locked: !prevState.die5Locked}))}/>
        </div>
        
        
        <button onClick={()=> this.rollDice()}> roll all </button>
        
        
      </Fragment>
    )
  }
}