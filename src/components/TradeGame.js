import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';

export default (props) => {
  
  //const sharesSentence = props.user.shares < 0 ? "You own shares!": null
  return(
    <div>
      <h2>Microsoft</h2>
      // Gameplay Information
      <button onClick={props.generator}>Play!</button>
      <br/>
      <button onClick={props.slowlier}> Slowlier </button>
      <button onClick={props.faster}> Faster </button>
      <h3>Speed is {props.speed/1000} sec</h3>

      // Chart
      <Chart data={props.chartData}/>

      // Game Form
      <button onClick={props.buy}>Buy!</button>
      <button onClick={props.sell}>Sell!</button>
      <input type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
      <label>Shares</label>

      {/* <h2>{props.state.user.shares} shares. {sharesSentence}</h2> */}
      <ActionList actionList = {props.actions} />
    </div>
  )
}


//
// <button onClick={() => props.handleTransaction('buy')}>Buy!</button>
// <button onClick={() => props.handleTransaction('sell')}>Sell!</button>
