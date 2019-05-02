import React, { Component } from 'react'


export default class Scorecard extends Component {
  constructor(props){
    super(props)
    this.state = {
      diceRoll: [0],
      scoreOnes: 0,
      scoreTwos: 0,
      scoreThrees: 0,
      scoreFours: 0,
      scoreFives: 0,
      scoreSixes: 0,
      scoreThreeOfAKind: 0,
      scoreFourOfAKind: 0,
      scoreFullHouse: 0,
      scoreSmStraight: 0,
      scoreLrgStraight: 0,
      scoreYahtzee: 0,
      scoreChance: 0,

    }  
    this.rollStatus = {}
  }
scoreDiceRoll(event){
  //console.log(event.target.dataset.id, this.rollStatus[event.target.dataset.id])
  if(this.rollStatus[event.target.dataset.id] === true){
    if (this.state[event.target.dataset.name] === 0) {
      this.setState({
        [event.target.dataset.name]: parseInt(event.target.dataset.value),
        diceRoll: ['']
      })
    this.props.clearRoll()
    }
    
  }else { alert('no')}
}

componentDidUpdate(prevProps, prevState){
  if (this.props.roll !== prevProps.roll){
    this.setState({diceRoll:this.props.roll})
  }
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
    let scoreBonus = 0
    if (scoreUpperSection >= 63) {scoreBonus = 35}
    let totalScore = scoreUpperSection + this.state.scoreThreeOfAKind + this.state.scoreFourOfAKind + this.state.scoreSmStraight + this.state.scoreLrgStraight + this.state.scoreFullHouse + this.state.scoreYahtzee + this.state.scoreChance + scoreBonus

    let hints = []
    if (counts[1] > 0 && this.state.scoreOnes === 0) {
      this.rollStatus.ones = true }
      else { this.rollStatus.ones = false}
    if (counts[2] > 0 && this.state.scoreTwos === 0) {
      this.rollStatus.twos = true }
      else { this.rollStatus.twos = false}
    if (counts[3] > 0 && this.state.scoreThrees === 0) {
      this.rollStatus.threes = true }
      else { this.rollStatus.threes = false}
    if (counts[4] > 0 && this.state.scoreFours === 0) {
      this.rollStatus.fours = true }
      else { this.rollStatus.fours = false}
    if (counts[5] > 0 && this.state.scoreFives === 0) {
      this.rollStatus.fives = true }
      else { this.rollStatus.fives = false}
    if (counts[6] > 0 && this.state.scoreSixes === 0) {
      this.rollStatus.sixes = true }
      else { this.rollStatus.sixes = false}    
    if (countsArray.findIndex((n) => n >=3) !== -1 && this.state.scoreThreeOfAKind === 0) {
          hints.push('3 of a Kind')
          this.rollStatus.threeOfAKind = true } 
      else {this.rollStatus.threeOfAKind = false}
    if (countsArray.findIndex((n) => n >= 4) !== -1 && this.state.scoreFourOfAKind === 0) {
          hints.push('4 of a Kind')
          this.rollStatus.fourOfAKind = true } 
      else {this.rollStatus.fourOfAKind = false}
    if (countsArray.findIndex((n) => n === 3) !== -1 && 
        countsArray.findIndex((n) => n === 2) !== -1 && this.state.scoreFullHouse === 0) {
          hints.push('Full House')
          this.rollStatus.fullHouse = true } 
      else {this.rollStatus.fullHouse = false}
    if (JSON.stringify(checkSmStraight).includes('1,2,3,4') || 
        JSON.stringify(checkSmStraight).includes('2,3,4,5') || 
        JSON.stringify(checkSmStraight).includes('3,4,5,6')) {
          if(this.state.scoreSmStraight === 0){
            hints.push('Small Straight')
            this.rollStatus.smallStraight = true } }
      else {this.rollStatus.smallStraight = false}
    if (JSON.stringify(roll) === JSON.stringify([1,2,3,4,5]) || 
        JSON.stringify(roll) === JSON.stringify([2,3,4,5,6])) {
          if(this.state.scoreLrgStraight === 0){
          hints.push('Large Straight')
          this.rollStatus.largeStraight = true } }
      else {this.rollStatus.largeStraight = false}
    if (countsArray.findIndex((n) => n > 4) !== -1 && this.state.scoreYahtzee === 0) {
          hints.push('Yahtzee!')
          this.rollStatus.yahtzee = true } 
      else {this.rollStatus.yahtzee = false} 
    if (this.state.scoreChance === 0 && this.state.diceRoll.length > 1){
      this.rollStatus.chance = true }
      else {this.rollStatus.chance = false
    }

    return(
      <>
        <div className="scorecard">
          <table>
            <thead>
              <tr>
                <th colSpan='4'>Scorecard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="ones" data-name="scoreOnes" data-value={countsArray[1]}>{countsArray[1]}</td>
                <td style={{backgroundColor:`${this.rollStatus.ones ? 'green' : ''}`, color:`${this.rollStatus.ones ? 'white': ''}`}}>Ones</td>
                <td>{this.state.scoreOnes}</td>
                <td>Count and add only Ones</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="twos" data-name="scoreTwos" data-value={countsArray[2] * 2}>{countsArray[2] * 2}</td>
                <td style={{backgroundColor:`${this.rollStatus.twos ? 'green' : ''}`, color:`${this.rollStatus.twos ? 'white': ''}`}}>Twos</td>
                <td>{this.state.scoreTwos}</td>
                <td>Count and add only Twos</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threes" data-name="scoreThrees" data-value={countsArray[3] * 3}>{countsArray[3] * 3}</td>
                <td style={{backgroundColor:`${this.rollStatus.threes ? 'green' : ''}`, color:`${this.rollStatus.threes ? 'white': ''}`}}>Threes</td>
                <td>{this.state.scoreThrees}</td>
                <td>Count and add only Threes</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fours" data-name="scoreFours" data-value={countsArray[4] * 4}>{countsArray[4] * 4}</td>
                <td style={{backgroundColor:`${this.rollStatus.fours ? 'green' : ''}`, color:`${this.rollStatus.fours ? 'white': ''}`}}>Fours</td>
                <td>{this.state.scoreFours}</td>
                <td>Count and add only Fours</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fives" data-name="scoreFives" data-value={countsArray[5] * 5}>{countsArray[5] * 5}</td>
                <td style={{backgroundColor:`${this.rollStatus.fives ? 'green' : ''}`, color:`${this.rollStatus.fives ? 'white': ''}`}}>Fives</td>
                <td>{this.state.scoreFives}</td>
                <td>Count and add only Fives</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="sixes" data-name="scoreSixes" data-value={countsArray[6] * 6}>{countsArray[6] * 6}</td>
                <td style={{backgroundColor:`${this.rollStatus.sixes ? 'green' : ''}`, color:`${this.rollStatus.sixes ? 'white': ''}`}}>Sixes</td>
                <td>{this.state.scoreSixes}</td>
                <td>Count and add only Sixes</td>
              </tr>
              <tr>
                <td></td>
                <td>Bonus</td>
                <td>{scoreBonus}</td>
                <td>35 bonus points if total of above is over 63</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threeOfAKind" data-name="scoreThreeOfAKind" data-value={rollTotal}>{this.rollStatus.threeOfAKind ? rollTotal : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.threeOfAKind ? 'green' : ''}`, color:`${this.rollStatus.threeOfAKind ? 'white': ''}`}}>3 of a kind</td>
                <td>{this.state.scoreThreeOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fourOfAKind" data-name="scoreFourOfAKind" data-value={rollTotal}>{this.rollStatus.fourOfAKind ? rollTotal : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.fourOfAKind ? 'green' : ''}`, color:`${this.rollStatus.fourOfAKind ? 'white': ''}`}}>4 of a kind</td>
                <td>{this.state.scoreFourOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fullHouse" data-name="scoreFullHouse" data-value={this.rollStatus.fullHouse ? 25 : 0}>{this.rollStatus.fullHouse ? 25 : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.fullHouse ? 'green' : ''}`, color:`${this.rollStatus.fullHouse ? 'white': ''}`}}>Full House</td>
                <td>{this.state.scoreFullHouse}</td>
                <td>25 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="smallStraight" data-name="scoreSmStraight" data-value={this.rollStatus.smallStraight ? 30 : 0}>{this.rollStatus.smallStraight ? 30 : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.smallStraight ? 'green' : ''}`, color:`${this.rollStatus.smallStraight ? 'white': ''}`}}>Small Straight</td>
                <td>{this.state.scoreSmStraight}</td>
                <td>30 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="largeStraight" data-name="scoreLrgStraight" data-value={this.rollStatus.largeStraight ? 40 : 0}>{this.rollStatus.largeStraight ? 40 : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.largeStraight ? 'green' : ''}`, color:`${this.rollStatus.largeStraight ? 'white': ''}`}}>Large Straight</td>
                <td>{this.state.scoreLrgStraight}</td>
                <td>40 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="yahtzee" data-name="scoreYahtzee" data-value={this.rollStatus.yahtzee ? 50 : 0}>{this.rollStatus.yahtzee ? 50 : 0}</td>
                <td style={{backgroundColor:`${this.rollStatus.yahtzee ? 'green' : ''}`, color:`${this.rollStatus.yahtzee ? 'white': ''}`}}>YAHTZEE</td>
                <td>{this.state.scoreYahtzee}</td>
                <td>50 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="chance" data-name="scoreChance" data-value={rollTotal}>{rollTotal}</td>
                <td style={{backgroundColor:`${this.rollStatus.chance ? 'green' : ''}`, color:`${this.rollStatus.chance ? 'white': ''}`}}>Chance</td>
                <td>{this.state.scoreChance}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td></td>
                <td>Total Score</td>
                <td>{totalScore}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

        {hints.map((hint,i) => (
         <div key={i}> {hint}</div>
          )) }
          

        </div>
      </>
    )
  }
}
