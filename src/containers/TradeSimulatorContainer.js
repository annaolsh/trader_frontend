import React, { Component } from 'react';
import User from '../components/User.js';
import TradeGame from '../components/TradeGame.js';

export default class TradeSimulatorContainer extends Component {
  render(){
    return(
      <div>
        <h1>Welcome to Trade Simulator</h1>
        <User />
        <TradeGame />

      </div>
    )
  }
}
