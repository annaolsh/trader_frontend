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
    var timeEnd = 0
    var interval = 3000 //3 seconds
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
    let maxV = lastValue + 10
    let minV = lastValue - 10
    //let randomValue = Math.floor(Math.random() * (maxV - minV) + minV)
    //if randomValue - 5 <= 0
    let randomValue = () => {return (Math.floor(Math.random() * (maxV - minV) + minV))}

    array.push(randomValue()); //pushes random number within a range depending on previous value
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
