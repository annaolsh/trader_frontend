import React, { Component } from 'react';
import User from '../components/User.js';
import TradeGame from '../components/TradeGame.js';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

class TradeSimulatorContainer extends Component {
  constructor(props){
    super()
    this.state = {
      liveData: null,
      firstValue: 0,
      canBuyStock: true,
      gameIsOn: false,
      actions: [],
      sharesToBuy: 1,
      speed: 2000, //1 min, 30 sec, 15 sec, 5 sec, 2 sec
      firstValue: 0,
      growth: 0,
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
    var container = this
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
            actions: data.actions
          })
        })
      fetch('https://crossorigin.me/http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=UBW6')
      .then(res => res.json())
        .then(data => {
          var timeSeries = data["Time Series (1min)"]
          var keys = Object.keys(timeSeries).reverse() //first key is the open time, last - clos time
          var array = keys.map( key => parseFloat(parseFloat(timeSeries[key]["4. close"]).toFixed(2)))
          container.setState({
            liveData: array
          })
        })
    }
  }

  gameIsOn(){
    this.setState({
      gameIsOn: true
    })
  }

  generator(){
    var component = this
    var counter = 0
    var liveData = this.state.liveData
    console.log(liveData)
    var i = 0
    var array = []
    function repeat(){
      setTimeout(()=>{
        if (counter % 5) {
          component.random(array, 'random')
        } else { //ever fifth loop render liveValue
          component.random(array, 'liveData', i)
          i +=1
            if (i >= 100){
              i = 0
            }
          }
        counter +=1
        repeat()
      }, component.state.speed)
    }
    repeat()
  }

  random(array, action, i){
    console.log("i in the begining: ", i)
    var liveData = this.state.liveData
    if (action === 'random'){
      var lastValue = array[array.length-1]
      var randomValue = (lastValue) => {
        var maxV = lastValue + lastValue*0.03
        var minV = lastValue - lastValue*0.03
        var value = parseFloat((Math.random() * (maxV - minV) + minV).toFixed(2))
        if (value <= 0 || value > array[0] * 2){
          var minV = array[0] - array[0]*0.5
          var maxV = array[0] + array[0]*0.5
          return (parseFloat((Math.random() * (maxV - minV) + minV).toFixed(2)))
        } else {
          return (value)
        }
      } //defins a random value within a range (depends on last value in an array)
      array.push(randomValue(lastValue)); //pushes random number within a range depending on previous value
    } else if (action === 'liveData') {
      array.push(liveData[i])
      console.log("livedata: ", liveData[i])
    }
    this.addNewValue(array)
    this.chartDataLength()
    this.upOrDown(array)
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

  upOrDown(array){
    if(array.length >=2){
      var lastValue = array[array.length-1]
      var previousValue = array[array.length-2]
      var growth = ((lastValue - previousValue)/lastValue * 100).toFixed(2)
      this.setState({
        growth: growth
      })
    }

  }

  handleBuy(){
    var lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    var wantToPay = lastValue * this.state.sharesToBuy
    var wallet = this.props.currentUser.wallet
    //var difference = wallet - wantToPay
    if(wantToPay <= wallet){ //if user has enough money to buy all stocks user wants
      var paid = wantToPay
      var data = {
        paid: -paid,
        sharesToBuy: this.state.sharesToBuy,
      }
      this.props.changeAppUserState(data, () => this.callApi("bought"))
    } else if (wallet > lastValue){ //if cost of 1 stock is less than money in the pocket
      var actuallyCanBuy = Math.floor(wallet / lastValue)
      var paid = (lastValue * actuallyCanBuy)
      var data = {
        paid: -paid,
        sharesToBuy: actuallyCanBuy
      }
      this.props.changeAppUserState(data, () => this.callApi("bought"))

    } else {  //user can not afford a purchase
      this.setState({
        canBuyStock: false
      })
    }
  }

  handleSell(){
    var lastValue = this.state.data.datasets[0].data[this.state.data.datasets[0].data.length-1]
    var paid = lastValue * this.state.sharesToBuy
    var data = {
      paid: paid,
      sharesToBuy: -this.state.sharesToBuy
    }
    this.props.changeAppUserState(data, () => this.callApi("bought"))
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
      body: JSON.stringify(
        {
          user_action: {
            user_id: this.props.currentUser.id,
            income: paid,
            action: `${action}`,
            current_price: parseFloat((lastValue).toFixed(2)),
            shares: this.state.sharesToBuy,
          },
          wallet: this.props.currentUser.wallet,
          stocksUserHas: this.props.currentUser.shares
      })
    })
    .then(res=> res.json())
    .then(function(data){
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
          gameIsOnFunction={this.gameIsOn.bind(this)}
          gameIsOn={this.state.gameIsOn}
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
          user={this.props.currentUser}
          canBuyStock={this.state.canBuyStock}
          growth={this.state.growth}
        />
      </div>
    )
  }
}
export default withRouter(TradeSimulatorContainer)
