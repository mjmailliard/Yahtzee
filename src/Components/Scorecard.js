import React, { Component } from 'react'


export default class Scorecard extends Component {
  constructor(props){
    super(props)
    this.state = {
      diceRoll: ['']
    }
  }
componentDidUpdate(prevProps, prevState){
  if (this.props.roll !== prevProps.roll){
    this.setState({diceRoll:this.props.roll})
  }
}
  render(){
    const roll = this.state.diceRoll
    roll.sort()   
    const checkSmStraight = [...new Set(roll)]

    let counts = {}
    roll.forEach((x) => { counts[x] = (counts[x] || 0)+1; })
    let defaultCount = {0:0,1:0, 2:0, 3:0,4:0,5:0,6:0}
    counts = Object.assign(defaultCount, counts)
    let countsArray = Object.values(counts)
    console.log('counts', countsArray)
    let hints = []

    if (countsArray.findIndex((n) => n === 3) !== -1) {
      hints.push('3 of a Kind')}
    if (countsArray.findIndex((n) => n === 4) !== -1) {
      hints.push('4 of a Kind')}
    if (countsArray.findIndex((n) => n === 3) !== -1 && 
        countsArray.findIndex((n) => n === 2) !== -1) {
      hints.push('Full House')}
    if (JSON.stringify(checkSmStraight).includes('1,2,3,4') || 
        JSON.stringify(checkSmStraight).includes('2,3,4,5') || 
        JSON.stringify(checkSmStraight).includes('3,4,5,6')) {
      hints.push('Small Straight')}
    if (JSON.stringify(roll) === JSON.stringify([1,2,3,4,5]) || 
        JSON.stringify(roll) === JSON.stringify([2,3,4,5,6])) {
      hints.push('Large Straight')}
    if (countsArray.findIndex((n) => n > 4) !== -1) {
      hints.push('Yahtzee!')} 

    
    
    return(
      <>
      
        <div className="scorecard">
          Scorecard<br/>
          <table>
            <tbody>
              <tr>
                <td>Ones</td>
                <td></td>
                <td>Count and add only Ones</td>
              </tr>
              <tr>
                <td>Twos</td>
                <td></td>
                <td>Count and add only Twos</td>
              </tr>
              <tr>
                <td>Threes</td>
                <td></td>
                <td>Count and add only Threes</td>
              </tr>
              <tr>
                <td>Fours</td>
                <td></td>
                <td>Count and add only Fours</td>
              </tr>
              <tr>
                <td>Fives</td>
                <td></td>
                <td>Count and add only Fives</td>
              </tr>
              <tr>
                <td>Sixes</td>
                <td></td>
                <td>Count and add only Sixes</td>
              </tr>
              <tr>
                <td>Bonus</td>
                <td></td>
                <td>35 bonus points if total score is over 63</td>
              </tr>
              <tr>
                <td>3 of a kind</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td>4 of a kind</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td>Full House</td>
                <td></td>
                <td>25 points</td>
              </tr>
              <tr>
                <td>Small Straight</td>
                <td></td>
                <td>25 points</td>
              </tr>
              <tr>
                <td>Large Straight</td>
                <td></td>
                <td>40 points</td>
              </tr>
              <tr>
                <td>YAHTZEE</td>
                <td></td>
                <td>50 points</td>
              </tr>
              <tr>
                <td>Chance</td>
                <td></td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                <td>Total Score</td>
                <td></td>
                <td></td>
              </tr>


            </tbody>
          </table>
        {roll.reduce((acc, cur) => acc + cur)}<br/>
        {roll}<br/>
        {hints.map((hint,i) => (
         <div key={i}> {hint}</div>
          )) }
          

        </div>
      </>
    )
  }
}
