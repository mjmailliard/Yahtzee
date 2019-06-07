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
   
  render() {
    return (
      <>
        <div className="dieSize">
          {this.state.dieValue}
        </div>

      </>
    )
  }
}

