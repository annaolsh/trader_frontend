import React from 'react'

export default (props) => {
  
  return(
    <div>
      <h2>Username: {props.user.username}</h2>
      <h3>Wallet: ${props.user.wallet}</h3>
    </div>
  )
}
