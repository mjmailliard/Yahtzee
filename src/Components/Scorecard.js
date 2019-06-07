import React, { Component } from 'react'
import HighScores from './HighScores'
import AddScore from './AddScore'
import Modal from 'react-modal'
import YahtzeeRules from './YahtzeeRules';

const customStyles = {
  content : {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : 'rgb(0, 47, 92)',
    height                : '65%',
    overflow              : 'scroll',
  }
}
Modal.setAppElement('#root')
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
      yahtzeeCount: 0,
      modalGetScoresVisible: false,
      modalAddScoreVisible: false,
      modalHowToPlay: false,
      scoreBoard: [{name: 'Loading Scores'}],
    }  
    this.countsArrayCopy = {}
    this.rollStatus = {}
  }
getHighScores = async () => {
  // console.log('getHighScores()')
   await fetch('https://serene-wildwood-42273.herokuapp.com/')
    .then(data => data.json())
    .then(jsonData => this.setState({scoreBoard: jsonData[0]}))
    
}
async componentDidMount() {
  // console.log('scorecard didMount')
  await this.getHighScores()

}
componentDidUpdate(prevProps, prevState){
  // console.log('scorecard didUpdate')
  if (this.props.roll !== prevProps.roll){
    this.setState({diceRoll:this.props.roll})
  }
}
async scoreDiceRoll(event) {
  event.persist()
  const endRoll = async () => {
    await this.setState({yahtzeeCount: this.state.yahtzeeCount + 1})
    await this.setState({turnCount: this.state.turnCount + 1})
    await this.setState({scoreYahtzee: this.state.scoreYahtzee + 100})
    this.props.clearRoll()
    this.setState({diceRoll: [0]})  
  }
//this will catch additional yahtzee rolls
  if(this.countsArrayCopy.findIndex((n) => n > 4) !== -1 && this.state.scoreYahtzee >= 50){
    if (event.target.dataset.name === 'scoreOnes' || event.target.dataset.name === 'scoreTwos' || event.target.dataset.name === 'scoreThrees' || event.target.dataset.name === 'scoreFours' || event.target.dataset.name === 'scoreFives' || event.target.dataset.name === 'scoreSixes'){
      //check if corresponding row has been scored
      if (this.state[event.target.dataset.name] === null){  
        await this.setState({
          [event.target.dataset.name]: parseInt(event.target.dataset.value),
          diceRoll: ['']
        })
        endRoll()
      } 
    } else { 
      const topSectionAvailable = () => {
        switch(this.countsArrayCopy.findIndex(n => n > 4 )) {
          case 1:
            console.log('case 1')
            return this.state.scoreOnes === null ? true : false
          case 2:
              console.log('case 2')
            return this.state.scoreTwos === null ? true : false
          case 3:
              console.log('case 3')
            return this.state.scoreThrees === null ? true : false
          case 4:
              console.log('case 4')
            return this.state.scoreFours === null ? true : false            
          case 5:
              console.log('case 5')
            return this.state.scoreFives === null ? true : false
          case 6:
              console.log('case 6')
            return this.state.scoreSixes === null ? true : false        
            default:
              console.log('default die value switch')
            }
      }

      if (this.state[event.target.dataset.name] === null){
        if(topSectionAvailable()) { 
          alert(`This roll must be scored as ${this.countsArrayCopy.findIndex(n => n > 4 )}'s in the top section.`)
        } else {
          await this.setState({
            [event.target.dataset.name]: parseInt(event.target.dataset.value),
            diceRoll: ['']
          })
         await endRoll() 
        }
      }
    } 
  } else {
  if(this.countsArrayCopy.findIndex((n) => n > 4) !== -1){
    await this.setState({yahtzeeCount: this.state.yahtzeeCount + 1})
   }
  if(this.state.diceRoll.length > 1){
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
     this.setState({diceRoll: [0]})
    }
    if(this.state.turnCount >= 13) {
      const scoreBoardLength = this.state.scoreBoard.length
      this.setState({gameOver: 'Game Over'})
      this.props.toggleGameOver(true)
      if (event.target.dataset.score > this.state.scoreBoard[scoreBoardLength - 1].score) {
      this.setState({modalAddScoreVisible: true})
      } 
      this.setState({modalGetScoresVisible: true})
    }
  }
  }
}

newGame() {
  // console.log('newGame()')
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
    yahtzeeCount: 0,
    
  })
  this.props.clearRoll()
  this.props.toggleGameOver(false)
}

handleShowHighScores = async () => {
  this.newGame()
  this.getHighScores()
  this.setState({modalAddScoreVisible: false})
  this.setState({modalGetScoresVisible: false})

  
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
    this.countsArrayCopy = countsArray
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
          this.rollStatus.yahtzee = true
          this.yahtzeeCount++ } 
      else {this.rollStatus.yahtzee = false} 
      
    if (countsArray.findIndex((n) => n > 4) !== -1 && this.state.scoreYahtzee >= 50) {
      hints = 'Another Yahtzee and 100 bonus points!'
      // if (){
        //check if corresponding upper section is null
        //  if yes, highlight only upper section
        //if no, highlight all lower sections that are not null
      // }
      
    }
    if (this.state.scoreChance === null && this.state.diceRoll.length > 1){
      this.rollStatus.chance = true }
      else {this.rollStatus.chance = false }

    
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
                <td style={{borderWidth: '0'}}>This Roll: {rollTotal}</td>
                <td className="hints" colSpan='2' style={{borderWidth: '0', color:`${hints.length > 0 || this.state.gameOver != null ? '#0a0': ''}`}}>{hints}{this.state.gameOver}</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreOnes === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreOnes === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[1]}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="ones" data-pips='1' data-name="scoreOnes" data-value={countsArray[1]} data-score={totalScore} className={this.rollStatus.ones ? 'highlight' : 'noHighlight'}>Ones</td>
                <td className="scoreColumn">{this.state.scoreOnes}</td>
                <td>Count and add only Ones</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreTwos === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreTwos === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[2] * 2}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="twos" data-pips='2' data-name="scoreTwos" data-value={countsArray[2] * 2} data-score={totalScore} className={this.rollStatus.twos ? 'highlight' : 'noHighlight'}>Twos</td>
                <td className="scoreColumn">{this.state.scoreTwos}</td>
                <td>Count and add only Twos</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreThrees === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreThrees === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[3] * 3}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threes" data-pips='3' data-name="scoreThrees" data-value={countsArray[3] * 3} data-score={totalScore} className={this.rollStatus.threes ? 'highlight' : 'noHighlight'}>Threes</td>
                <td className="scoreColumn">{this.state.scoreThrees}</td>
                <td>Count and add only Threes</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreFours === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreFours === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[4] * 4}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fours" data-pips='4' data-name="scoreFours" data-value={countsArray[4] * 4} data-score={totalScore} className={this.rollStatus.fours ? 'highlight' : 'noHighlight'}>Fours</td>
                <td className="scoreColumn">{this.state.scoreFours}</td>
                <td>Count and add only Fours</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreFives === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreFives === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[5] * 5}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fives" data-pips='5' data-name="scoreFives" data-value={countsArray[5] * 5} data-score={totalScore} className={this.rollStatus.fives ? 'highlight' : 'noHighlight'}>Fives</td>
                <td className="scoreColumn">{this.state.scoreFives}</td>
                <td>Count and add only Fives</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreSixes === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreSixes === 0) ? 'red':''}`}}>
                {/* <td>{countsArray[6] * 6}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="sixes" data-pips='6' data-name="scoreSixes" data-value={countsArray[6] * 6} data-score={totalScore} className={this.rollStatus.sixes ? 'highlight' : 'noHighlight'}>Sixes</td>
                <td className="scoreColumn">{this.state.scoreSixes}</td>
                <td>Count and add only Sixes</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Upper Section</td>
                <td className="scoreColumn">{(scoreUpperSection > 0) ? scoreUpperSection : null}</td>
                <td>Total of Upper Section</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Bonus</td>
                <td className="scoreColumn">{scoreBonus}</td>
                <td>35 bonus points if total of upper section is 63 or more.</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreThreeOfAKind === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreThreeOfAKind === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.threeOfAKind ? rollTotal : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="threeOfAKind" data-name="scoreThreeOfAKind" data-value={rollTotal} data-score={totalScore} className={this.rollStatus.threeOfAKind ? 'highlight' : 'noHighlight'}>3 of a kind</td>
                <td className="scoreColumn">{this.state.scoreThreeOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreFourOfAKind === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreFourOfAKind === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.fourOfAKind ? rollTotal : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fourOfAKind" data-name="scoreFourOfAKind" data-value={rollTotal} data-score={totalScore} className={this.rollStatus.fourOfAKind ? 'highlight' : 'noHighlight'}>4 of a kind</td>
                <td className="scoreColumn">{this.state.scoreFourOfAKind}</td>
                <td>Total of all dice</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreFullHouse === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreFullHouse === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.fullHouse ? 25 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="fullHouse" data-name="scoreFullHouse" data-value={this.rollStatus.fullHouse ? 25 : 0} data-score={totalScore} className={this.rollStatus.fullHouse ? 'highlight' : 'noHighlight'}>Full House</td>
                <td className="scoreColumn">{this.state.scoreFullHouse}</td>
                <td>25 points</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreSmStraight === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreSmStraight === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.smallStraight ? 30 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="smallStraight" data-name="scoreSmStraight" data-value={this.rollStatus.smallStraight ? 30 : 0} data-score={totalScore} className={this.rollStatus.smallStraight ? 'highlight' : 'noHighlight'}>Small Straight</td>
                <td className="scoreColumn">{this.state.scoreSmStraight}</td>
                <td>30 points</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreLrgStraight === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreLrgStraight === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.largeStraight ? 40 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="largeStraight" data-name="scoreLrgStraight" data-value={this.rollStatus.largeStraight ? 40 : 0} data-score={totalScore} className={this.rollStatus.largeStraight ? 'highlight' : 'noHighlight'}>Large Straight</td>
                <td className="scoreColumn">{this.state.scoreLrgStraight}</td>
                <td>40 points</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreYahtzee === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreYahtzee === 0) ? 'red':''}`}}>
                {/* <td>{this.rollStatus.yahtzee ? 50 : 0}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="yahtzee" data-name="scoreYahtzee" data-value={this.rollStatus.yahtzee ? 50 : 0} data-score={totalScore} className={this.rollStatus.yahtzee ? 'highlight' : 'noHighlight'}>YAHTZEE</td>
                <td className="scoreColumn">{this.state.scoreYahtzee}</td>
                <td>50 points (100 per additional)</td>
              </tr>
              <tr style={{textDecorationLine:`${(this.state.scoreChance === 0) ? 'line-through':''}`,textDecorationColor:`${(this.state.scoreChance === 0) ? 'red':''}`}}>
                {/* <td>{rollTotal}</td> */}
                <td onClick={(e) => this.scoreDiceRoll(e)} data-id="chance" data-name="scoreChance" data-value={rollTotal} data-score={totalScore} className={this.rollStatus.chance ? 'highlight' : 'noHighlight'}>Chance</td>
                <td className="scoreColumn">{this.state.scoreChance}</td>
                <td>Total of all dice</td>
              </tr>
              <tr>
                {/* <td></td> */}
                <td>Total<br/>Score</td>
                <td className="scoreColumn">{(totalScore > 0) ? totalScore : null}</td>
                <td className='btnContainer'>
                  <button onClick={() => this.newGame()}>New Game</button>
                  <button onClick={()=> this.setState({modalHowToPlay: true})} className='cursorHelp'>How to play</button>
                  <button onClick={()=> this.setState({modalGetScoresVisible: true})}>High Scores</button>
                  {/* <button onClick={()=> this.setState({modalAddScoreVisible: true})}>add Scores</button> */}
                </td>
              </tr>
            </tbody>
          </table>
          <Modal id='HowToPlay'
            isOpen={this.state.modalHowToPlay}
            onRequestClose={()=>this.setState({modalHowToPlay: false})}
            style={customStyles}
          >
            <YahtzeeRules/>
            <button className='closeModalBtn' onClick={()=>this.setState({modalHowToPlay: false})}>X</button>
          </Modal>
          <Modal id='HighScores'
            isOpen={this.state.modalGetScoresVisible}
            //onAfterOpen={()=>this.getHighScores()}
            onRequestClose={()=>this.setState({modalGetScoresVisible: false})}
            style={customStyles}
          >
            <HighScores scores={this.state.scoreBoard} refreshScores={this.getHighScores}/>
            <button className='closeModalBtn' onClick={()=>this.setState({modalGetScoresVisible: false})}>X</button>
          </Modal>
          <Modal id='AddScore'
            isOpen={this.state.modalAddScoreVisible}
            onRequestClose={()=>this.setState({modalAddScoreVisible: false})}
            style={customStyles}
            >
              <AddScore score={totalScore} showHighScores={this.handleShowHighScores} refreshScores={this.getHighScores}/>
            <button className='closeModalBtn' onClick={()=>this.setState({modalAddScoreVisible: false})}>X</button>

          </Modal>


        </div>
      </>
    )
  }
}
