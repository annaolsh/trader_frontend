import React from 'react'

export default (props) => {
  return(
    <div>
      <h2>User name: {props.user.name}</h2>
      <h3>Wallet: ${props.user.wallet}</h3>
    </div>
  )
}
