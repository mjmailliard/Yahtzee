import React, { Component, Fragment } from 'react'
import Die from './Die'


export default class Dice extends Component {

  render() {
    return(
      <Fragment>
        <Die/><Die/><Die/><Die/><Die/>
      </Fragment>
    )
  }
}