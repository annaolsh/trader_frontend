import React, { Component } from 'react';
import User from '../components/User.js';
import TradeGame from '../components/TradeGame.js';


export default class TradeSimulatorContainer extends Component {
  constructor(){
    super()
    this.state = {
      user: {
        name: 'Anna',
        wallet: 1000,
        shares: 0
      },
      data: { //object for chart.js
        labels: [],
        datasets: [
          {
            label: '$',
            fill: false,
            lineTension: 0.1,
            backgroundColor: null,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }

  //generates random values (currency trader Simulator)
  generator(){
    var array = [Math.floor(Math.random() * 100 + 24)]  //generates a start point
    var timer
    var timeEnd = 0
    var interval = 2000 //3 seconds
    timer = setInterval(() => {
      timeEnd += 2
      if(timeEnd < 60){
        this.random(array)
      } else {
        clearInterval(timer)
      }
    }, interval)
  }

  random(array){
    let lastValue = array[array.length-1]
    let maxV = lastValue + 10
    let minV = lastValue - 10
    let randomValue = () => {return (Math.floor(Math.random() * (maxV - minV) + minV))} //defins a random value within a range (depends on last value in an array)
    array.push(randomValue()); //pushes random number within a range depending on previous value
    //return array[array.length-1]
    this.addNewValue(array)
  }

  addNewValue(array){
    var chartData = this.state.data.datasets[0].data
    var labels = this.state.data.labels
    this.setState({
      data: {
        labels: labels.concat([array.length]),
        datasets: [
          {
            label: '$',
            fill: false,
            lineTension: 0.05,
            backgroundColor: 'null',
            borderColor: 'rgb(255,0,0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(255,0,0)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(255,0,0)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            width: 400,
            data: chartData.concat([array[array.length-1]])
          }
        ]
      }
    })
  }

  handleBuy(){
    let lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]

    this.setState({
      user: {
        name: "Anna",
        wallet: this.state.user.wallet - lastValue,
        shares: this.state.user.shares + 1
      }
    })
  }

  handleSell(){
    let lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    this.setState({
      user: {
        name: "Anna",
        wallet: this.state.user.wallet + lastValue,
        shares: this.state.user.shares - 1
      }
    })
  }

  render(){
    return(
      <div>
        <h1>Welcome to Trade Simulator</h1>
        <User user={this.state.user}/>

        <TradeGame generator={this.generator.bind(this)} buy={this.handleBuy.bind(this)} sell={this.handleSell.bind(this)} state={this.state}/>
      </div>
    )
  }
}
