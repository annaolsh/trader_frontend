import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';

export default (props) => {
  const sharesSentence = props.state.user.shares < 0 ? "You own shares!": null
  return(
    <div>
      <h2>Microsoft</h2>
      <button onClick={props.generator}>Play!</button>
      <br/>
      <button onClick={props.slowlier}> Slowlier </button>
      <button onClick={props.faster}> Faster </button>
      <h3>Speed is {props.state.speed/1000} sec</h3>
      <Chart data={props.state.data}/>
      <button onClick={props.buy}>Buy!</button>
      <button onClick={props.sell}>Sell!</button>
      <form>
        <label>
          <input type="number" min="0" step="1" value={props.state.sharesToBuy} onChange={props.handleChange}/> Shares
        </label>
      </form>

      <h2>{props.state.user.shares} shares. {sharesSentence}</h2>
      <ActionList actionList = {props.state.actions} />
    </div>
  )
}
