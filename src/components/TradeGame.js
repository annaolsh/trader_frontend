import React from 'react'

export default (props) => {
  return(
    <div>
      <h2>This is TradeGame component</h2>
      <button onClick={props.generator}>Play!</button>
      <p>
        {props.values.map(value => {
        return `${value} `
        }) }
      </p>
    </div>
  )
}
