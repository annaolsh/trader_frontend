import React from 'react'
export default (props) => {
  var action = props.action
  var date = action.created_at.slice(0, 10) + " " + action.created_at.slice(11, 19)
  return (
    <tr>
      <td class="text-left">{date}</td>
      <td class="text-left">{action.action}</td>
      <td class="text-left">{action.shares}</td>
      <td class="text-left">{action.current_price}</td>
      <td class="text-left">{action.income}</td>
    </tr>
  )
}
