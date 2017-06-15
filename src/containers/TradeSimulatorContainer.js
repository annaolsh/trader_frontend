import React, { Component } from 'react';
import User from '../components/User.js';
import TradeGame from '../components/TradeGame.js';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

class TradeSimulatorContainer extends Component {
  constructor(props){
    super()
    this.state = {
      actions: [],
      sharesToBuy: 1,
      speed: 2000, //1 min, 30 sec, 15 sec, 5 sec, 2 sec
      firstValue: 0,
      data: { //object for chart.js
        labels: [],
        datasets: [
          {
            label: '$',
            fill: false,
            lineTension: 0.0,
            backgroundColor: null,
            borderColor: 'rgb(255,0,0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderWidth: 2,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(255,0,0)',
            pointBackgroundColor: 'rgb(255,0,0)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(75,192,192,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }

  //renders all actions
  componentDidMount(){
    if(!localStorage.jwt){
      return this.props.history.push('/login')
    } else {
      fetch(`http://localhost:3000/users/${localStorage.id}`, {
        headers: {
        'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            actions: data.user_actions
          })
        })
    }
  }

  generator(){
    //this.firstValueGenerator()
    //var array = [this.state.firstValue]
    var array = [(parseFloat((Math.random() * 80 + 10).toFixed(4)))]
    var component = this
    var counter = 0
    //array.push(parseFloat((Math.random() * 80 + 10).toFixed(4)))  //generates a start point
    console.log("Array startpoint is: ", array[0])
    function repeat(){
      setTimeout(()=>{
        component.random(array)
        counter +=1
        if (counter < 1000){
          repeat()
        }
      }, component.state.speed)
    }
    repeat()
  }

  firstValueGenerator(){
    fetch('https://crossorigin.me/http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=UBW6')
      .then(res => res.json())
      .then(data => {
        var timeSeries = data["Time Series (1min)"]
        this.setState({
          firstValue: timeSeries[Object.keys(timeSeries)[0]]["4. close"]
        })
      })
  }

  random(array){
    let lastValue = array[array.length-1]
    let maxV = lastValue + 10
    let minV = lastValue - 10
    let randomValue = () => {
      var value = parseFloat((Math.random() * (maxV - minV) + minV).toFixed(4))
      if (value <= 0 || value > array[0] * 4){
        return (parseFloat((Math.random() * (60 - 20) + 20).toFixed(4)))
      } else {return (value)}

    } //defins a random value within a range (depends on last value in an array)
    array.push(randomValue()); //pushes random number within a range depending on previous value
    //return array[array.length-1]
    this.addNewValue(array)
    this.chartDataLength()
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
            pointBackgroundColor: 'rgb(255,0,0)',
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
    var lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    var paid = lastValue * this.state.sharesToBuy
    this.setState({
      user: {
        name: this.props.currentUser.username,
        wallet: parseFloat((this.props.currentUser.wallet - paid).toFixed(4)) ,
        shares: parseInt(this.props.currentUser.shares) + parseInt(this.state.sharesToBuy)
      }
    }, () => this.callApi("bought"))
  }

  handleSell(){
    var lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    var paid = lastValue * this.state.sharesToBuy
    this.setState({
      user: {
          name: this.props.currentUser.username,
          wallet: parseFloat((this.props.currentUser.wallet + paid).toFixed(4)) ,
          shares: parseInt(this.props.currentUser.shares) - parseInt(this.state.sharesToBuy)
      }
    } , () => this.callApi("sold"))
  }

  callApi(action){
    var paid;
    let lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    if (action === "bought"){
      var paid = -lastValue * this.state.sharesToBuy
    } else {var paid = lastValue * this.state.sharesToBuy}
    const component = this
    fetch('http://localhost:3000/actions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_action: {
        user_id: this.props.currentUser.id,
        income: paid,
        action: `${action}`,
        current_price: parseFloat((lastValue).toFixed(4)),
        shares: this.state.sharesToBuy,
        wallet: this.state.user.wallet
      }})
    })
    .then(res=> res.json())
    .then(function(data){
      component.props.changeWalletAmount(data.wallet.amount)
      component.setState(prevState => {
        return {
            actions: [...prevState.actions, data.action]
        }
      })
    })

  }

  chartDataLength(){
    var chartData = this.state.data.datasets[0].data
    var labels = this.state.data.labels
    if (chartData.length >=60){
      chartData.shift()
      labels.shift()
      this.setState({
        data: { //object for chart.js
          labels: labels,
          datasets: [
            {
              label: '$',
              fill: false,
              lineTension: 0.1,
              backgroundColor: null,
              borderColor: 'rgb(255,0,0)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderWidth: 2,
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgb(255,0,0)',
              pointBackgroundColor: 'rgb(255,0,0)',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgb(255,0,0)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 2,
              pointHitRadius: 10,
              data: chartData
            }
          ]
        }
      })
    }
  }

  handleChange(e){
    e.preventDefault()
    this.setState({
      sharesToBuy: parseInt(e.target.value)
    })
  }

  decreaseSpeed(){
    if (this.state.speed === 30000){
      this.setState({
        speed: 60000
      })
    } else if (this.state.speed === 15000){
      this.setState({
        speed: 30000
      })
    } else if (this.state.speed === 5000){
      this.setState({
        speed: 15000
      })
    } else if (this.state.speed === 2000){
      this.setState({
        speed: 5000
      })
    }
  }

  increaseSpeed(){
    if (this.state.speed === 60000){
      this.setState({
        speed: 30000
      })
    } else if (this.state.speed === 30000){
      this.setState({
        speed: 15000
      })
    } else if (this.state.speed === 15000){
      this.setState({
        speed: 5000
      })
    } else if (this.state.speed === 5000){
      this.setState({
        speed: 2000
      })
    }
  }

  render(){
    return(
      <div id="wrapper">
        <User user={this.props.currentUser}/>
        {/* <GameInfo gameData={} />
        <Chart chartData={} />
        <GameForm /> */}
        <TradeGame
          generator={this.generator.bind(this)}
          buy={this.handleBuy.bind(this)}
          sell={this.handleSell.bind(this)}
          speed={this.state.speed}
          sharesToBuy={this.state.sharesToBuy}
          chartData={this.state.data}
          handleChange={this.handleChange.bind(this)}
          faster={this.increaseSpeed.bind(this)}
          slowlier={this.decreaseSpeed.bind(this)}
          actions={this.state.actions}
        />
      </div>
    )
  }
}
export default withRouter(TradeSimulatorContainer)
