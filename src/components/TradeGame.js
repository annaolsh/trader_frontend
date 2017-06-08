import React from 'react'
import Chart from '../components/Chart.js';

export default (props) => {
  return(
    <div>
      <button onClick={props.generator}>Play!</button>
      <Chart data={props.data}/>
      <button onClick={props.buy}>Buy!</button>
      <button onClick={props.sell}>Sell!</button>
    </div>
  )
}
