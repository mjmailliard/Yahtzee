import React, { Component } from 'react'


export default class Scorecard extends Component {
  constructor(props){
    super(props)
    this.state = {
      turnCount: 0,
      diceRoll: [0],
      scoreOnes: null,
      scoreTwos: null,
      scoreThrees: null,
      scoreFours: null,
      scoreFives: null,
      scoreSixes: null,
      scoreThreeOfAKind: null,
      scoreFourOfAKind: null,
      scoreFullHouse: null,
      scoreSmStraight: null,
      scoreLrgStraight: null,
      scoreYahtzee: null,
      scoreChance: null,
      gameOver: null,
    }  
    this.rollStatus = {}
  }
componentDidUpdate(prevProps, prevState){
  if (this.props.roll !== prevProps.roll){
    this.setState({diceRoll:this.props.roll})
  }
}
async scoreDiceRoll(event) {

    if(this.rollStatus[event.target.dataset.id] === true) {
      if (this.state[event.target.dataset.name] === null) {
        await this.setState({
          [event.target.dataset.name]: parseInt(event.target.dataset.value),
          diceRoll: ['']
        })
        await this.setState({turnCount: this.state.turnCount + 1})
        this.props.clearRoll()
      }
    } else if ( this.state[event.target.dataset.name] === null ) {
      await this.setState({
        [event.target.dataset.name]: 0
      })
     await this.setState({turnCount: this.state.turnCount + 1})

     this.props.clearRoll()
    }
    if(this.state.turnCount >= 13) {
      this.setState({gameOver: 'Game Over'})
      
    }
}

newGame() {
  this.setState({
    turnCount: 0,
    diceRoll: [0],
    scoreOnes: null,
    scoreTwos: null,
    scoreThrees: null,
    scoreFours: null,
    scoreFives: null,
    scoreSixes: null,
    scoreThreeOfAKind: null,
    scoreFourOfAKind: null,
    scoreFullHouse: null,
    scoreSmStraight: null,
    scoreLrgStraight: null,
    scoreYahtzee: null,
    scoreChance: null,
    gameOver: null,
  })
  this.props.clearRoll()
}



  render(){
    const roll = this.state.diceRoll
    const rollTotal = roll.reduce((acc, cur) => acc + cur)
    roll.sort()   
    const checkSmStraight = [...new Set(roll)]
    let counts = {}
    roll.forEach((x) => { counts[x] = (counts[x] || 0)+1; })
    let defaultCount = {0:0,1:0, 2:0, 3:0,4:0,5:0,6:0}
    counts = Object.assign(defaultCount, counts)
    let countsArray = Object.values(counts)

    const scoreUpperSection = this.state.scoreOnes + this.state.scoreTwos + this.state.scoreThrees + this.state.scoreFours + this.state.scoreFives + this.state.scoreSixes
    let scoreBonus = null
    if (scoreUpperSection >= 63) {scoreBonus = 35}
    let totalScore = scoreUpperSection + this.state.scoreThreeOfAKind + this.state.scoreFourOfAKind + this.state.scoreSmStraight + this.state.scoreLrgStraight + this.state.scoreFullHouse + this.state.scoreYahtzee + this.state.scoreChance + scoreBonus
    let hints = ''
    if (counts[1] > 0 && this.state.scoreOnes === null) {
      this.rollStatus.ones = true }
      else { this.rollStatus.ones = false}
    if (counts[2] > 0 && this.state.scoreTwos === null) {
      this.rollStatus.twos = true }
      else { this.rollStatus.twos = false}
    if (counts[3] > 0 && this.state.scoreThrees === null) {
      this.rollStatus.threes = true }
      else { this.rollStatus.threes = false}
    if (counts[4] > 0 && this.state.scoreFours === null) {
      this.rollStatus.fours = true }
      else { this.rollStatus.fours = false}
    if (counts[5] > 0 && this.state.scoreFives === null) {
      this.rollStatus.fives = true }
      else { this.rollStatus.fives = false}
    if (counts[6] > 0 && this.state.scoreSixes === null) {
      this.rollStatus.sixes = true }
      else { this.rollStatus.sixes = false}    
    if (countsArray.findIndex((n) => n >=3) !== -1 && this.state.scoreThreeOfAKind === null) {
          hints ='You rolled 3 of a Kind'
          this.rollStatus.threeOfAKind = true } 
      else {this.rollStatus.threeOfAKind = false}
    if (countsArray.findIndex((n) => n >= 4) !== -1 && this.state.scoreFourOfAKind === null) {
          hints = 'You rolled 4 of a Kind'
          this.rollStatus.fourOfAKind = true } 
      else {this.rollStatus.fourOfAKind = false}
    if (countsArray.findIndex((n) => n === 3) !== -1 && 
        countsArray.findIndex((n) => n === 2) !== -1 && this.state.scoreFullHouse === null) {
          hints = 'You rolled a Full House'
          this.rollStatus.fullHouse = true } 
      else {this.rollStatus.fullHouse = false}
    if (JSON.stringify(checkSmStraight).includes('1,2,3,4') || 
        JSON.stringify(checkSmStraight).includes('2,3,4,5') || 
        JSON.stringify(checkSmStraight).includes('3,4,5,6')) {
          if(this.state.scoreSmStraight === null){
            hints = 'You rolled a Small Straight'
            this.rollStatus.smallStraight = true } }
      else {this.rollStatus.smallStraight = false}
    if (JSON.stringify(roll) === JSON.stringify([1,2,3,4,5]) || 
        JSON.stringify(roll) === JSON.stringify([2,3,4,5,6])) {
          if(this.state.scoreLrgStraight === null){
          hints = 'You rolled a Large Straight'
          this.rollStatus.largeStraight = true } }
      else {this.rollStatus.largeStraight = false}
    if (countsArray.findIndex((n) => n > 4) !== -1 && this.state.scoreYahtzee === null) {
          hints = 'YAHTZEE!!!'
          this.rollStatus.yahtzee = true } 
      else {this.rollStatus.yahtzee = false} 
    if (this.state.scoreChance === null && this.state.diceRoll.length > 1){
      this.rollStatus.chance = true }
      else {this.rollStatus.chance = false
    }


    return(
      <>
        <div className="scorecard">
          <table>
            {/* <thead>
              <tr>
                <th colSpan='3'>Scorecard</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td style={{borderWidth: '0'}}>Current Roll: {rollTotal}</td>
                <td style={{borderWidth: '0'}} colSpan='2'>{hints}{this.state.gameOver}</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreOnes === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[1]}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="ones" data-name="scoreOnes" data-value={countsArray[1]} style={{backgroundColor:`${this.rollStatus.ones ? '#0a0' : ''}`, color:`${this.rollStatus.ones ? 'white': ''}`}}>Ones</td>
                <td>{this.state.scoreOnes}</td>
                <td>Count and add only Ones</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreTwos === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[2] * 2}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="twos" data-name="scoreTwos" data-value={countsArray[2] * 2} style={{backgroundColor:`${this.rollStatus.twos ? '#0a0' : ''}`, color:`${this.rollStatus.twos ? 'white': ''}`}}>Twos</td>
                <td>{this.state.scoreTwos}</td>
                <td>Count and add only Twos</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreThrees === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[3] * 3}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threes" data-name="scoreThrees" data-value={countsArray[3] * 3} style={{backgroundColor:`${this.rollStatus.threes ? '#0a0' : ''}`, color:`${this.rollStatus.threes ? 'white': ''}`}}>Threes</td>
                <td>{this.state.scoreThrees}</td>
                <td>Count and add only Threes</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreFours === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[4] * 4}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fours" data-name="scoreFours" data-value={countsArray[4] * 4} style={{backgroundColor:`${this.rollStatus.fours ? '#0a0' : ''}`, color:`${this.rollStatus.fours ? 'white': ''}`}}>Fours</td>
                <td>{this.state.scoreFours}</td>
                <td>Count and add only Fours</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreFives === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[5] * 5}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fives" data-name="scoreFives" data-value={countsArray[5] * 5} style={{backgroundColor:`${this.rollStatus.fives ? '#0a0' : ''}`, color:`${this.rollStatus.fives ? 'white': ''}`}}>Fives</td>
                <td>{this.state.scoreFives}</td>
                <td>Count and add only Fives</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreSixes === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{countsArray[6] * 6}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="sixes" data-name="scoreSixes" data-value={countsArray[6] * 6} style={{backgroundColor:`${this.rollStatus.sixes ? '#0a0' : ''}`, color:`${this.rollStatus.sixes ? 'white': ''}`}}>Sixes</td>
                <td>{this.state.scoreSixes}</td>
                <td>Count and add only Sixes</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Upper Section</td>
                <td>{(scoreUpperSection > 0) ? scoreUpperSection : null}</td>
                <td>Total of Upper Section</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Bonus</td>
                <td>{scoreBonus}</td>
                <td>35 bonus points if total of upper section is 63 or more.</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreThreeOfAKind === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.threeOfAKind ? rollTotal : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threeOfAKind" data-name="scoreThreeOfAKind" data-value={rollTotal} style={{backgroundColor:`${this.rollStatus.threeOfAKind ? '#0a0' : ''}`, color:`${this.rollStatus.threeOfAKind ? 'white': ''}`}}>3 of a kind</td>
                <td>{this.state.scoreThreeOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreFourOfAKind === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.fourOfAKind ? rollTotal : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fourOfAKind" data-name="scoreFourOfAKind" data-value={rollTotal} style={{backgroundColor:`${this.rollStatus.fourOfAKind ? '#0a0' : ''}`, color:`${this.rollStatus.fourOfAKind ? 'white': ''}`}}>4 of a kind</td>
                <td>{this.state.scoreFourOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreFullHouse === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.fullHouse ? 25 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fullHouse" data-name="scoreFullHouse" data-value={this.rollStatus.fullHouse ? 25 : 0} style={{backgroundColor:`${this.rollStatus.fullHouse ? '#0a0' : ''}`, color:`${this.rollStatus.fullHouse ? 'white': ''}`}}>Full House</td>
                <td>{this.state.scoreFullHouse}</td>
                <td>25 points</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreSmStraight === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.smallStraight ? 30 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="smallStraight" data-name="scoreSmStraight" data-value={this.rollStatus.smallStraight ? 30 : 0} style={{backgroundColor:`${this.rollStatus.smallStraight ? '#0a0' : ''}`, color:`${this.rollStatus.smallStraight ? 'white': ''}`}}>Small Straight</td>
                <td>{this.state.scoreSmStraight}</td>
                <td>30 points</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreLrgStraight === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.largeStraight ? 40 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="largeStraight" data-name="scoreLrgStraight" data-value={this.rollStatus.largeStraight ? 40 : 0} style={{backgroundColor:`${this.rollStatus.largeStraight ? '#0a0' : ''}`, color:`${this.rollStatus.largeStraight ? 'white': ''}`}}>Large Straight</td>
                <td>{this.state.scoreLrgStraight}</td>
                <td>40 points</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreYahtzee === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{this.rollStatus.yahtzee ? 50 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="yahtzee" data-name="scoreYahtzee" data-value={this.rollStatus.yahtzee ? 50 : 0} style={{backgroundColor:`${this.rollStatus.yahtzee ? '#0a0' : ''}`, color:`${this.rollStatus.yahtzee ? 'white': ''}`}}>YAHTZEE</td>
                <td>{this.state.scoreYahtzee}</td>
                <td>50 points</td>
              </tr>
              <tr style={{textDecoration:`${(this.state.scoreChance === 0) ? 'line-through solid red':''}`}}>
                {/* <td>{rollTotal}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="chance" data-name="scoreChance" data-value={rollTotal} style={{backgroundColor:`${this.rollStatus.chance ? '#0a0' : ''}`, color:`${this.rollStatus.chance ? 'white': ''}`}}>Chance</td>
                <td>{this.state.scoreChance}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Total Score</td>
                <td>{(totalScore > 0) ? totalScore : null}</td>
                <td><button onClick={() => this.newGame()}>New Game</button></td>
              </tr>
            </tbody>
          </table>

          {/* {hints.map((hint,i) => (
            <div key={i}> {hint} </div>
          ))}
           */}

        </div>
      </>
    )
  }
}
