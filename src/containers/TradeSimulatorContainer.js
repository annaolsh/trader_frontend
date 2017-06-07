import React, { Component } from 'react';
import User from '../components/User.js';
import TradeGame from '../components/TradeGame.js';

export default class TradeSimulatorContainer extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        name: 'Anna',
        wallet: 1000
      },
      values: []
    }
  }

  //generates random values (currency trader Simulator)
  generator(){
    var array = [Math.floor(Math.random() * 100 + 24)]  //generates first random value of the array
    var timer
    var timeNowInMs = new Date().getTime()
    var timeEnd = 0
    var interval = 3000
    timer = setInterval(() => {
      timeEnd += 3
      if(timeEnd < 60){
        this.random(array)
      } else {
        clearInterval(timer)
      }
    }, interval);
  }

  random(array){
    let lastValue = array[array.length-1] //defines last value of an array
    let max = lastValue + 10
    let min = lastValue - 10
    array.push(Math.floor(Math.random() * (max - min) + min)); //pushes random number within a range depending on previous value
    //return array[array.length-1]
    this.addNewValue(array)
  }

  addNewValue(array){
    this.setState({
      values: this.state.values.concat([array[array.length-1]])
    })
  }

  handleBuy(){
    let lastValue = this.state.values[this.state.values.length-1]
    this.setState({
      user: {
        name: "Anna",
        wallet: this.state.user.wallet - lastValue
      }
    })
  }

  handleSell(){
    let lastIndexNumber = this.state.values.length-1
    let lastValue = this.state.values[lastIndexNumber]
    this.setState({
      user: {
        name: "Anna",
        wallet: this.state.user.wallet + lastValue
      }
    })
  }

  render(){
    return(
      <div>
        <h1>Welcome to Trade Simulator</h1>
        <User user={this.state.user}/>
        <TradeGame generator={this.generator.bind(this)} values={this.state.values} buy={this.handleBuy.bind(this)} sell={this.handleSell.bind(this)}/>
      </div>
    )
  }
}
