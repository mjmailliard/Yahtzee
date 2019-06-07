import React, { Component } from 'react'

export class YahtzeeRules extends Component {
  render() {
    return (
      <>
        <div className='rules'>
          <h1>Yahtzee Rules</h1>
          <h2> Overview</h2>
            <p>
            Yahtzee is a dice game made by Milton Bradley (now owned by Hasbro), which was first marketed as Yatzie by the National Association Service of Toledo, Ohio, in the early 1940s. The objective of the game is to score points by rolling five dice to make certain combinations. For more information, please visit the <a href='https://en.wikipedia.org/wiki/Yahtzee' target="_blank" rel="noopener noreferrer">Yahtzee Wikipedia Page</a>. Much of the information below was sourced from there and the official rules.
            </p>
            <h2>Game Play</h2>
              <ul>
                <li>The 5 dice may be rolled 1 to 3 times each round for 13 rounds.</li>
                <li>You may lock any number of dice to keep improving your score that round.</li> 
                <li>Each roll may be scored in one of 13 categories.</li>
                <li>Each category may be used only once.</li>
                <li>Your turn ends when you score a roll on the scorecard.</li>
                <li>In a multi-player game, each player has the opportunity to complete their rolls in turn before a new round has begun.</li>
              </ul>
            <h2>Scoring</h2>
              <ul>
                <li>Save your score to a category by selecting the name of the roll on the scorecard. Ones, Twos, Full House, Yahtzee, etc. </li> 
                <li>Every roll must be scored in either the upper or lower section.</li>
                <li>If your roll does not match the category, then that category will receive a score of zero.</li>
                <li>Scoring in this app is based on the offical rules distributed by Hasbro, including what's known as the Forced Joker rule. More on that below.</li>
              </ul>
              <h3>Upper Section</h3>
                <ul>
                  <li>There are six boxes in the upper section. </li>
                  <li>The score for each box is determined by adding the total of the matching dice for that category.</li> 
                  <li>For example, if you rolled 2,2,2,3,4 and selected the Twos category, only the 2's would be added together and your score in that category would be 6.</li>
                  <li>If the total of all rolls in the upper section is 63 or higher, you will get a bonus 35 points.</li>
                </ul>
              <h3>Lower Section</h3>
                <ul>
                  <li>The lower section has seven categories, with the criteria and scoring as follows:
                    <ul>
                      <li><b>Three of a Kind:</b> Must have at least 3 matching dice of any number. <b>Score:</b> Total of all dice.</li>
                      <li><b>Four of a Kind:</b> Must have at least 4 matching dice of any number. <b>Score:</b> Total of all dice.</li>
                      <li><b>Full House:</b> Must have 3 matching dice of any number, and 2 of any other number. <b>Score:</b> 25 points</li>
                      <li><b>Small Straight:</b> Must have 4 dice with sequential numbers. <b>Score:</b> 30 points</li>
                      <li><b>Large Straight:</b> Must have all 5 dice with sequential numbers. <b>Score:</b> 40 points</li>
                      <li><b>Yahtzee:</b> Must have all 5 dice with the same number. <b>Score:</b> 50 points*</li>
                      <li><b>Chance:</b> No special requirements, any combination of dice may be scored here. <b>Score:</b> Total of all dice.</li>
                    </ul>
                  </li>
                </ul>
              <h3>Yahtzee</h3>
                <label>*Rolling multiple Yahtzees in a single game has some unique quirks that can be difficult to follow.</label>
                <ul>
                  <li>Multiple Yahtzees
                    <ul>
                      <li>The first Yahtzee <b><i>scored in the Yahtzee category</i></b> is worth 50 points.</li>
                      <li>Additional Yahtzees scored after that automatically receive a <b>Yahtzee Bonus</b> of 100 points and may be scored according to the <b>Joker Rule</b> for additional points.</li>
                      <li>If you previously scored a roll of 0 in the Yahtzee category, then you are no longer eligible for the Yahtzee Bonus that game.</li>
                    </ul>
                  </li>
                  <li>Forced Joker Rule
                    <ul>
                      <li>If your Yahtzee category has already been filled in (either 0 points or 50 points), then a Yahtzee may be used as a wild card, based on the following rules: </li>
                    <li>If the corresponding upper section box is unused then that category must be used first, scoring a total of all 5 dice.</li>
                    <li>If the appropriate upper section box is already filled, then the roll may be used in any lower section category, with points calculated as if the roll matched the appropriate criteria. For example, a Yahtzee scored in the Full House category would be worth 25 points(possibly more if you also earned the Yahtzee Bonus).</li>

                    </ul>
                  </li>

                </ul>
          </div>        

      </>
    )
  }
}

export default YahtzeeRules
