import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';



export default (props) => {
  function onClick(){
    props.gameIsOnFunction();
    props.generator()
  }

  const canBuyStock = !!props.canBuyStock ? null : "Not enough $. Try to sell first"
//  const sharesSentence = props.currentUser.shares < 0 ? "You own shares!": null
  return(
    <div>
      <button onClick={onClick}>Play!</button>
      <br/>
      <button onClick={props.slowlier}> Slowlier </button>
      <button onClick={props.faster}> Faster </button>
      <h3>Speed is {props.speed/1000} sec</h3>

      <Chart data={props.chartData}/>
      <h2>{props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]}</h2>

      <button disabled={!props.gameIsOn} onClick={props.buy}>Buy!</button>
      <button disabled={!props.gameIsOn} onClick={props.sell}>Sell!</button>
      <input type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
      <label>Shares</label>
      {canBuyStock}
      <ActionList actionList = {props.actions} />
    </div>
  )
}
//
  //<h2>{props.currentUser.shares} shares. {sharesSentence}</h2>
