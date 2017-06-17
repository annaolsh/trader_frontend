import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';



export default (props) => {
  //debugger
  function onClick(){
    props.gameIsOnFunction();
    props.generator()
  }

  const showGrowth = !!props.gameIsOn ? `${props.growth}%` : null
  const canBuyStock = !!props.canBuyStock ? "" : "Not enough $. Try to sell first"
  const sharesSentence = props.user.shares < 0 ? "You owe shares!": null
  return(
    <div>
      <button onClick={onClick} disabled={props.gameIsOn}>Play!</button>
      <br/>
      <button onClick={props.slowlier}> Slowlier </button>
      <button onClick={props.faster}> Faster </button>
      <h3>Speed is {props.speed/1000} sec</h3>

      <Chart data={props.chartData}/>
      <h2>{props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]} {showGrowth}</h2>

      <button className="raise" disabled={!props.gameIsOn} onClick={props.buy}>Buy!</button>
      <button className="raise" disabled={!props.gameIsOn} onClick={props.sell}>Sell!</button>
      <input type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
      <label>Shares</label> {`  ${canBuyStock}`}
      <h2>{props.user.shares} shares. {sharesSentence}</h2>
      <ActionList actionList = {props.actions} />
    </div>
  )
}
//
  //
