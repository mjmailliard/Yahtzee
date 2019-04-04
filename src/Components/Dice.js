import React, { Component, Fragment } from 'react'
// import Die from './Die'


export default class Dice extends Component {
  constructor(props){
    super(props)
    this.state = {
      die1: 0,
      die2: 0,
      die3: 0,
      die4: 0,
      die5: 0,
      die1Locked: false,
      die2Locked: false,
      die3Locked: false,
      die4Locked: false,
      die5Locked: false,

    }
    
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
    const diceArray = [this.state.die1, this.state.die2, this.state.die3, this.state.die4, this.state.die5]
    diceArray.sort()
    let counts = {}
    diceArray.forEach((x) => { counts[x] = (counts[x] || 0)+1; })
    console.log('counts', counts)
    let hint = 'default'
    console.log('dice array', diceArray)
    if (JSON.stringify(diceArray) === JSON.stringify([1,2,3,4,5]) || JSON.stringify(diceArray) === JSON.stringify([2,3,4,5,6])) {
      hint = 'You have a large straight'
    }
    return(
      <Fragment>
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
        
        {this.state.die1+this.state.die2+this.state.die3+this.state.die4+this.state.die5}<br/>
        {diceArray}<br/>
        {hint}
      </Fragment>
    )
  }
}