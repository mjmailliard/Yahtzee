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
  }
scoreDiceRoll(event){
  this.setState({
    [event.target.dataset.name]: parseInt(event.target.dataset.value),
    diceRoll: ['']
  })


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
    if (scoreUpperSection > 63) {scoreBonus = 35}
    let totalScore = scoreUpperSection + this.state.scoreThreeOfAKind + this.state.scoreFourOfAKind + this.state.scoreSmStraight + this.state.scoreLrgStraight + this.state.scoreFullHouse + this.state.scoreYahtzee + this.state.scoreChance + scoreBonus

    let hints = []

    if (countsArray.findIndex((n) => n >=3) !== -1) {
          hints.push('3 of a Kind')
          this.threeOfAKind = true } 
      else {this.threeOfAKind = false}
    if (countsArray.findIndex((n) => n >= 4) !== -1) {
          hints.push('4 of a Kind')
          this.FourOfAKind = true } 
      else {this.FourOfAKind = false}
    if (countsArray.findIndex((n) => n === 3) !== -1 && 
        countsArray.findIndex((n) => n === 2) !== -1) {
          hints.push('Full House')
          this.fullHouse = true } 
      else {this.fullHouse = false}
    if (JSON.stringify(checkSmStraight).includes('1,2,3,4') || 
        JSON.stringify(checkSmStraight).includes('2,3,4,5') || 
        JSON.stringify(checkSmStraight).includes('3,4,5,6')) {
          hints.push('Small Straight')
          this.smallStraight = true } 
      else {this.smallStraight = false}
    if (JSON.stringify(roll) === JSON.stringify([1,2,3,4,5]) || 
        JSON.stringify(roll) === JSON.stringify([2,3,4,5,6])) {
          hints.push('Large Straight')
          this.largeStraight = true } 
      else {this.largeStraight = false}
    if (countsArray.findIndex((n) => n > 4) !== -1) {
          hints.push('Yahtzee!')
          this.yahtzee = true } 
      else {this.yahtzee = false} 

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
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreOnes" data-value={countsArray[1]}>{countsArray[1]}</td>
                <td>Ones</td>
                <td>{this.state.scoreOnes}</td>
                <td>Count and add only Ones</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreTwos" data-value={countsArray[2] * 2}>{countsArray[2] * 2}</td>
                <td>Twos</td>
                <td>{this.state.scoreTwos}</td>
                <td>Count and add only Twos</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreThrees" data-value={countsArray[3] * 3}>{countsArray[3] * 3}</td>
                <td>Threes</td>
                <td>{this.state.scoreThrees}</td>
                <td>Count and add only Threes</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreFours" data-value={countsArray[4] * 4}>{countsArray[4] * 4}</td>
                <td>Fours</td>
                <td>{this.state.scoreFours}</td>
                <td>Count and add only Fours</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreFives" data-value={countsArray[5] * 5}>{countsArray[5] * 5}</td>
                <td>Fives</td>
                <td>{this.state.scoreFives}</td>
                <td>Count and add only Fives</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreSixes" data-value={countsArray[6] * 6}>{countsArray[6] * 6}</td>
                <td>Sixes</td>
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
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreThreeOfAKind" data-value={rollTotal}>{this.threeOfAKind ? rollTotal : 0}</td>
                <td>3 of a kind</td>
                <td>{this.state.scoreThreeOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreFourOfAKind" data-value={rollTotal}>{this.FourOfAKind ? rollTotal : 0}</td>
                <td>4 of a kind</td>
                <td>{this.state.scoreFourOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreFullHouse" data-value={this.fullHouse ? 25 : 0}>{this.fullHouse ? 25 : 0}</td>
                <td>Full House</td>
                <td>{this.state.scoreFullHouse}</td>
                <td>25 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreSmStraight" data-value={this.smallStraight ? 30 : 0}>{this.smallStraight ? 30 : 0}</td>
                <td>Small Straight</td>
                <td>{this.state.scoreSmStraight}</td>
                <td>30 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreLrgStraight" data-value={this.largeStraight ? 40 : 0}>{this.largeStraight ? 40 : 0}</td>
                <td>Large Straight</td>
                <td>{this.state.scoreLrgStraight}</td>
                <td>40 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreYahtzee" data-value={this.yahtzee ? 50 : 0}>{this.yahtzee ? 50 : 0}</td>
                <td>YAHTZEE</td>
                <td>{this.state.scoreYahtzee}</td>
                <td>50 points</td>
              </tr>
              <tr>
                <td onClick={(e) => this.scoreDiceRoll(e)} data-name="scoreChance" data-value={rollTotal}>{rollTotal}</td>
                <td>Chance</td>
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
