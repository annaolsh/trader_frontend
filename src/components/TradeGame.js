import React from 'react'

export default (props) => {
  return(
    <div>
      <button onClick={props.generator}>Play!</button>
      <p>
        {props.values.map(value => {
        return `${value} `
        }) }
      </p>
      <button onClick={props.buy}>Buy!</button>
      <button onClick={props.sell}>Sell!</button>
    </div>
  )
}
