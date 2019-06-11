import React, { Component } from 'react'
import '../App.css'

export default class Die extends Component {
  constructor(props){
    super(props)
    this.state = {
      dieValue: this.props.pips,
    }
  }

  componentDidUpdate(prevProps, prevState){
    // console.log('scorecard didUpdate')
    if (this.props.pips !== prevProps.pips){
      this.setState({dieValue:this.props.pips})
    }
  }
  returnDie = (die) =>{
    switch(die){
      case 1:
        return ( 
          <div className='die1'>
            <span className="pip"></span>
          </div>
        )
      case 2: 
        return ( 
          <div className='die2'>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 3: 
        return ( 
          <div className='die3'>
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        )
      case 4:
        return ( 
          <div className="die4">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>  
            </div>
            <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            </div>
          </div>
        )
      case 5:
        return ( 
          <div className="die5">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>  
            </div>
            <div className="column">
              <span className="pip"></span>
            </div>
            <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            </div>
          </div>
        )
      case 6:
        return ( 
          <div className="die6">
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>  
              <span className="pip"></span>  
            </div>
            <div className="column">
              <span className="pip"></span>
              <span className="pip"></span>
              <span className="pip"></span>
            </div>
          </div>
        )
      default:
        return '?'
    }
  }
   
  render() {
    return (
      <>
        
          {this.returnDie(this.state.dieValue)}
      

      </>
    )
  }
}

