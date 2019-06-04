import React, { Component } from 'react'

export class AddScore extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       score: this.props.score,
       name: '',
       taunt: ''
    }
  }
  scoreSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://serene-wildwood-42273.herokuapp.com/', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {'Content-Type': 'application/json'}
    })
    // .then(this.props.refreshScores())
    .then(this.props.showHighScores())
    
  }


  render() {
    return (
      <>
       <form onSubmit={(e)=>{this.scoreSubmit(e)}}>
         <h3> You've achieved a high score!</h3> 
         <h2>{this.state.score}</h2>
          <div><input type='text' onChange={(e)=> this.setState({name: e.target.value})} maxLength='14' placeholder='Name'/></div>
          <div><textarea onChange={(e)=> this.setState({taunt: e.target.value})} maxLength='255' placeholder='Taunt'/></div>
          <input type='submit'/>
        </form>  
     </>
    )
  }
}

export default AddScore
