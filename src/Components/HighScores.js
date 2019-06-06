import React, { Component } from 'react'

export class HighScores extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      scoreBoard: this.props.scores,
      scores: [{id: '42', name: 'Loading Scores'}]
    }
  }
  
  componentDidMount = async () => {
    // console.log('high scores componentDidMount')
    await fetch('https://serene-wildwood-42273.herokuapp.com/')
    .then(data => data.json())
    .then(jsonData => this.setState({scores: jsonData[0]}))
   //await this.props.refreshScores()

  }

  async componentDidUpdate(prevProps, prevState){
    // console.log('high scores componentDidUpdate')
    if (this.props.scores[9].id !== prevProps.scores[9].id) {
      // console.log('props changed')
      await this.setState({scores:this.props.scores})
    }
    // console.log('props haven`t changed')
  }

  render() {
    return (
      <table className='highScoresTable'>
        <thead>
          <tr>
            <th>Name</th><th>Score</th><th>Taunt</th>
          </tr>
        </thead>
        <tbody>
        {this.state.scores.map(score => 
          <tr key={score.id} className='highScoresTr'>
            <td className='name'>{score.name}</td><td className='score'>{score.score}</td><td className='taunt'>{`"${score.taunt}"`}</td>
          </tr>
        )}
        </tbody>
      </table>
    )
  }
}

export default HighScores
