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
            borderWidth: 2,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }


  // function nextSlide() {
  //   // show next slide now
  //   // set timer for the slide after this one
  //   setTimeout(function() {
  //       nextSlide();       // repeat
  //   }, xxx)
  // }

  generator(){
    var entry = this
    var counter = 0
    var array = [Math.floor(Math.random() * 80 + 40)]  //generates a start point
    console.log("Generator works. Array startpoint is: ", array[0])
    var interval = 2000 //2 seconds
    function repeat(){
      setTimeout(()=>{
        entry.random(array)
        counter +=1
        console.log(counter)
        if (counter < 10){
          repeat()
        }
      }, interval)

    }

    repeat()
  }

  random(array){
    console.log("Random is called!")
    let lastValue = array[array.length-1]
    let maxV = lastValue + 10
    let minV = lastValue - 10
    let randomValue = () => {
      console.log("RandomValue is called")
      return (Math.floor(Math.random() * (maxV - minV) + minV))
    } //defins a random value within a range (depends on last value in an array)
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

  callApi(action){
    const URL = 'http://localhost:3000/actions'
    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_action: {
        user_id: 1,
        income: 100,
        total: 1100,
        action: `${action}`,
        current_price: 5
      }})
    })
    .then(res=> console.log(res))
  }

  // fetch('http://localhost:3000/stories', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({story: {
  //       original_content: this.state.originalContent,
  //       title: this.state.title,
  //       translated_content: this.state.translatedContent
  //     }})
  //   })
  //   .then(res => res.json())
  //   .then(function(data){
  //     //console.log('data: ', data);
  //     entry.setState(prevState => {
  //       return {
  //         stories: [...prevState.stories, data],
  //         originalContent: "",
  //         translatedContent: "",
  //         title: ""
  //       }
  //     })
  //   })


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
