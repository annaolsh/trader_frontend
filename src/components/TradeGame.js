import React from 'react'
import Chart from '../components/Chart.js';

export default (props) => {
  const sharesSentence = props.state.user.shares < 0 ? "You own shares!": null
  return(
    <div>
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
      {props.state.actions.map(action => {
        var date = action.created_at.slice(0, 10) + " " + action.created_at.slice(11, 19)
        return(
          <p>{date} You {action.action} {props.state.sharesToBuy} stocks for ${action.current_price}/stock. Your profit is ${action.income}.</p>
        )
      }).reverse()}
    </div>
  )
}
