import React from 'react'
export default (props) => {
  //debugger
  var action = props.action
  var date = action.created_at.slice(0, 10) + " " + action.created_at.slice(11, 19)
  return (
    <tr>
      <td className="text-left">{date}</td>
      <td className="text-left">{action.action}</td>
      <td className="text-left">{action.shares}</td>
      <td className="text-left">{action.current_price}</td>
      <td className="text-left">{action.income}</td>
    </tr>
  )
}
