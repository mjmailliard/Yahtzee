import React, { Component } from 'react'
import Scorecard from './Scorecard';

export default class Dice extends Component {
  constructor(props){
    super(props)
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
      diceRoll: [],
    }
  }
  rollDice = async () => {
    if (this.state.die1Locked === false ) { 
      await this.setState({die1: Math.ceil(Math.random() * 6)})
    }
    if (this.state.die2Locked === false ) { 
      await this.setState({die2: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die3Locked === false ) { 
      await this.setState({die3: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die4Locked === false ) { 
      await this.setState({die4: Math.ceil(Math.random() * 6)});
    }
    if (this.state.die5Locked === false ) { 
      await this.setState({die5: Math.ceil(Math.random() * 6)});
    }
    this.setState({diceRoll: [this.state.die1, this.state.die2, this.state.die3, this.state.die4, this.state.die5]})
  }
  render() {
    return(
      <>
        <div className="diceContainer">
        <div>
          <div className="dieSize">
            {this.state.die1}
          </div>
          <input type="checkbox" onChange={e => this.setState(prevState => ({die1Locked: !prevState.die1Locked}))} id='die1' name='die1' value='locked'/>
        </div> 
        <div> 
          <div className="dieSize">
            {this.state.die2}
          </div>
          <input type="checkbox" id='die2' name='die2' value='locked' onChange={e => this.setState(prevState => ({die2Locked: !prevState.die2Locked}))}/>
     </div> 
        <div>
          <div className="dieSize"> 
            {this.state.die3}
          </div>
        <input type="checkbox" id='die3' name='die3' value='locked' onChange={e => this.setState(prevState => ({die3Locked: !prevState.die3Locked}))}/>
        </div>  
        <div>
          <div className="dieSize">
            {this.state.die4}
          </div>
          <input type="checkbox" id='die4' name='die4' value='locked' onChange={e => this.setState(prevState => ({die4Locked: !prevState.die4Locked}))}/>
      </div>  
        <div>
          <div className="dieSize"> 
            {this.state.die5}
          </div>
          <input type="checkbox" id='die5' name='die5' value='locked' onChange={e => this.setState(prevState => ({die5Locked: !prevState.die5Locked}))}/>
        </div>
        
        
        <button onClick={()=> this.rollDice()}> roll all </button>
        

        </div>
        <Scorecard roll={this.state.diceRoll}/>
      </>
    )
  }
}