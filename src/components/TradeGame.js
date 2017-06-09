import React from 'react'
import Chart from '../components/Chart.js';

export default (props) => {
  return(
    <div>
      <button onClick={props.generator}>Play!</button>
      <Chart data={props.state.data}/>
      <h2>{props.state.user.shares} shares</h2>
      <button onClick={props.buy}>Buy!</button>
      <button onClick={props.sell}>Sell!</button>
      {props.state.actions.map(action => {
        var date = action.created_at.slice(0, 10) + " " + action.created_at.slice(11, 19)
        return(
          <p>{date} You {action.action} stocks for ${action.current_price}. Your income is {action.income}</p>
        )
      }).reverse()}
    </div>
  )
}
