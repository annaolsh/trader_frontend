import React from 'react'

export default (props) => {

  return(
    <div>
      <h2 id="username">Name: {props.user.username}</h2>
      <h3 id="wallet">Wallet: ${props.user.wallet}</h3>
    </div>
  )
}
