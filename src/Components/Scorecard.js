import React, { Component } from 'react'

export default class Scorecard extends Component {
  render(){
    return(
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
      </div>
    )
  }
}
