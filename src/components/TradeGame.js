import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';



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
      <button className="pulse-button" onClick={onClick} disabled={props.gameIsOn}>Play!</button>
      <br/>
      <div className="game-field">
        <button onClick={props.slowlier}> Slowlier </button>
        <button onClick={props.faster}> Faster </button>
        <h3 id="speed">Speed is {props.speed/1000} sec</h3>
        <Chart data={props.chartData}/>
        {stocksGrowth()}
        <h2 className="white-text-game-field">
          {props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]}
        </h2>
        <button className="raise" disabled={!props.userCanBuy} onClick={props.buy}>Buy!</button>
        <button className="raise" disabled={!props.userCanBuy} onClick={props.sell}>Sell!</button>
        <input type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
        <label>Shares</label> {`  ${canBuyStock}`}
        <h3 className="white-text-game-field">You have</h3>
        <h2 className="white-text-game-field">{props.user.shares} {stocksQuantity} </h2>
        <h3 style={{color: 'red'}}>{stocksSentence} </h3>
      </div>
      <ActionList actionList = {props.actions} />
    </div>
  )
}
//
  //
