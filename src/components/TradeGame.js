import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';
import Companies from '../components/Companies.js';
import { Button } from 'react-bootstrap';
var Loader = require('react-loader');

export default (props) => {
  function onClick(){
    props.gameIsOnFunction();
    props.generator()
  }
  const showGrowth = !!props.gameIsOn ? `${props.growth}%` : null
  const canBuyStock = !!props.canBuyStock ? "" : "Not enough $. Try to sell first"
  const stocksSentence = props.user.shares < 0 ? "You owe stocks!": null
  const stocksQuantity = props.user.shares === 1 || props.user.shares === -1 ? "stock" : "stocks"
  const growth = props.showGrowth
  const growthColor = growth >= 0 ? "{color: green}" : "{color: red}"

  function stocksGrowth(){
    if(props.growth === 0){
      return <h3 style={{color: "rgb(255,255,255)"}}> {showGrowth}</h3>
    } else if (props.growth > 0) {
      return <h3 style={{color: "rgb(50,205,50)"}}> +{showGrowth}</h3>
    } else {
      return <h3 style={{color: "rgb(255,0,0)"}}> {showGrowth}</h3>
    }
  }


  return(
    <div >
      <Companies fetchLiveDataForSelectedCompany={props.fetchLiveDataForSelectedCompany} turnOnLoader={props.turnOnLoader} stopPreviousGame={props.stopPreviousGame}/>
      <Loader loaded={props.loaded} lines={13} length={20} width={10} radius={30}
              corners={1} rotate={0} direction={1} color="#000" speed={1}
              trail={60} shadow={true} hwaccel={true} className="spinner"
              zIndex={2e9} top="50%" left="50%" scale={1.00}
              loadedClassName="loadedContent">

        <h1 id="selected-company">{props.selectedCompany}</h1>
        <Button onClick={onClick} disabled={props.gameIsOn}>Play!</Button>
        <br/>
        <div className="game-field">
          <Button onClick={props.slowlier}> Slowlier </Button>
          <Button onClick={props.faster}> Faster </Button>
          <h3 id="speed">Speed is {props.speed/1000} sec</h3>
          <Chart data={props.chartData}/>
          {stocksGrowth()}
          <h2 className="white-text-game-field">
            {props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]}
          </h2>
          <Button className="raise" disabled={!props.userCanBuy} onClick={props.buy}>Buy!</Button>
          <Button className="raise" disabled={!props.userCanBuy} onClick={props.sell}>Sell!</Button>
          <input type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
          <label>Shares</label> {`  ${canBuyStock}`}
          <h3 className="white-text-game-field">You have</h3>
          <h2 className="white-text-game-field">{props.user.shares} {stocksQuantity} </h2>
          <h3 style={{color: 'red'}}>{stocksSentence} </h3>
        </div>
        <ActionList actionList = {props.actions} />
      </Loader>


    </div>
  )
}
