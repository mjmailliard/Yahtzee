import React, { Component } from 'react'


export default class Scorecard extends Component {
  constructor(props){
    super(props)
    this.state = {
      diceRoll: [''],

    }
    let threeOfAKind, FourOfAKind, fullHouse, smallStraight,largeStraight,yahtzee = false


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

   console.log('counts', countsArray)
    let hints = []

    if (countsArray.findIndex((n) => n >=3) !== -1) {
      hints.push('3 of a Kind')
      this.threeOfAKind = true } else {this.threeOfAKind = false}
    if (countsArray.findIndex((n) => n >= 4) !== -1) {
      hints.push('4 of a Kind')
      this.FourOfAKind = true } else {this.FourOfAKind = false}
    if (countsArray.findIndex((n) => n === 3) !== -1 && 
        countsArray.findIndex((n) => n === 2) !== -1) {
      hints.push('Full House')
      this.fullHouse = true } else {this.fullHouse = false}
    if (JSON.stringify(checkSmStraight).includes('1,2,3,4') || 
        JSON.stringify(checkSmStraight).includes('2,3,4,5') || 
        JSON.stringify(checkSmStraight).includes('3,4,5,6')) {
      hints.push('Small Straight')
      this.smallStraight = true } else {this.smallStraight = false}
    if (JSON.stringify(roll) === JSON.stringify([1,2,3,4,5]) || 
        JSON.stringify(roll) === JSON.stringify([2,3,4,5,6])) {
      hints.push('Large Straight')
      this.largeStraight = true } else {this.largeStraight = false}
    if (countsArray.findIndex((n) => n > 4) !== -1) {
      hints.push('Yahtzee!')
      this.yahtzee = true } else {this.yahtzee = false} 

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
                <td>{countsArray[1]}</td>
                <td>Ones</td>
                <td></td>
                <td>Count and add only Ones</td>
              </tr>
              <tr>
                <td>{countsArray[2] * 2}</td>
                <td>Twos</td>
                <td></td>
                <td>Count and add only Twos</td>
              </tr>
              <tr>
                <td>{countsArray[3] * 3}</td>
                <td>Threes</td>
                <td></td>
                <td>Count and add only Threes</td>
              </tr>
              <tr>
                <td>{countsArray[4] * 4}</td>
                <td>Fours</td>
                <td></td>
                <td>Count and add only Fours</td>
              </tr>
              <tr>
                <td>{countsArray[5] * 5}</td>
                <td>Fives</td>
                <td></td>
                <td>Count and add only Fives</td>
              </tr>
              <tr>
                <td>{countsArray[6] * 6}</td>
                <td>Sixes</td>
                <td></td>
                <td>Count and add only Sixes</td>
              </tr>
              <tr>
                <td></td>
                <td>Bonus</td>
                <td></td>
                <td>35 bonus points if total of above is over 63</td>
              </tr>
              <tr>
                <td>{this.threeOfAKind ? rollTotal : 0}</td>
                <td>3 of a kind</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td>{this.FourOfAKind ? rollTotal : 0}</td>
                <td>4 of a kind</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td>{this.fullHouse ? 25 : 0}</td>
                <td>Full House</td>
                <td></td>
                <td>25 points</td>
              </tr>
              <tr>
                <td>{this.smallStraight ? 30 : 0}</td>
                <td>Small Straight</td>
                <td></td>
                <td>30 points</td>
              </tr>
              <tr>
                <td>{this.largeStraight ? 40 : 0}</td>
                <td>Large Straight</td>
                <td></td>
                <td>40 points</td>
              </tr>
              <tr>
                <td>{this.yahtzee ? 50 : 0}</td>
                <td>YAHTZEE</td>
                <td></td>
                <td>50 points</td>
              </tr>
              <tr>
                <td>{rollTotal}</td>
                <td>Chance</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td></td>
                <td>Total Score</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        {rollTotal}<br/>
        {roll}<br/>
        {hints.map((hint,i) => (
         <div key={i}> {hint}</div>
          )) }
          

        </div>
      </>
    )
  }
}
