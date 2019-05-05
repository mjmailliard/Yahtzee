import React, { Component } from 'react'
import Scorecard from './Scorecard';
import unLocked from '../Assets/lockOpen.png'
import locked from '../Assets/lockClosed.png'

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
      rollCount: 0,
    }
  }
  rollDice = async () => {
    // if (this.state.rollCount === 3) {alert('Sorry, only 3 rolls. \n You must score your dice in a category below to continue.')} 
    //   else {
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
      this.setState({rollCount: parseInt([this.state.rollCount]) + 1 })
  //  }
  }
  clearRoll = async () => {
    await this.setState({
      // die1: '',
      // die2: '',
      // die3: '',
      // die4: '',
      // die5: '',
      die1Locked: false,
      die2Locked: false,
      die3Locked: false,
      die4Locked: false,
      die5Locked: false,  
      rollCount: 0, 
    })
    this.rollDice()
  }
  render() {
    return(
      <>
        <div className="diceContainer">
        <div>
          <label>
            <div className="dieSize">
              {this.state.die1}
            </div>
            <img className="lock" src={this.state.die1Locked ? locked:unLocked} alt={this.state.die1Locked ? 'Die 1 is locked':'Die 1 is unLocked'}/>
            <input hidden type="checkbox" checked={this.state.die1Locked} onChange={e => this.setState(prevState => ({die1Locked: !prevState.die1Locked}))} id='die1' name='die1' value='locked'/>
        </label>
        </div> 
        <div> 
          <label>
            <div className="dieSize">
              {this.state.die2}
            </div>
            <img className="lock" src={this.state.die2Locked ? locked:unLocked} alt={this.state.die2Locked ? 'Die 2 is locked':'Die 2 is unLocked'}/>
            <input hidden type="checkbox" id='die2' name='die2' checked={this.state.die2Locked} onChange={e => this.setState(prevState => ({die2Locked: !prevState.die2Locked}))}/>
          </label>
     </div> 
        <div>
          <label>
            <div className="dieSize"> 
              {this.state.die3}
            </div>
            <img className="lock" src={this.state.die3Locked ? locked:unLocked} alt={this.state.die3Locked ? 'Die 3 is locked':'Die 3 is unLocked'}/>
            <input hidden type="checkbox" id='die3' name='die3' checked={this.state.die3Locked} onChange={e => this.setState(prevState => ({die3Locked: !prevState.die3Locked}))}/>
          </label>
        </div>  
        <div>
          <label>
            <div className="dieSize">
              {this.state.die4}
            </div>
            <img className="lock" src={this.state.die4Locked ? locked:unLocked} alt={this.state.die4Locked ? 'Die 4 is locked':'Die 4 is unLocked'}/>
            <input hidden type="checkbox" id='die4' name='die4' checked={this.state.die4Locked} onChange={e => this.setState(prevState => ({die4Locked: !prevState.die4Locked}))}/>
          </label>
      </div>  
        <div>
        <label>
            <div className="dieSize"> 
              {this.state.die5}
            </div>
            <img className="lock" src={this.state.die5Locked ? locked:unLocked} alt={this.state.die5Locked ? 'Die 5 is locked':'Die 5 is unLocked'}/>
            <input hidden type="checkbox" id='die5' name='die5' checked={this.state.die5Locked} onChange={e => this.setState(prevState => ({die5Locked: !prevState.die5Locked}))}/>
          </label>
        </div>
        
       <button className="btnRollDice" onClick={()=> this.rollDice()}> Roll Dice </button>

        
      </div>
       <div className="scorecard">
      {(this.state.rollCount === 1) ? 'First Roll': 
          (this.state.rollCount === 2) ? 'Second Roll': 
          (this.state.rollCount === 3) ? 'Last Roll': 'Roll the dice to begin'}
</div>  
        
        <Scorecard roll={this.state.diceRoll} clearRoll={this.clearRoll}/>
      </>
    )
  }
}