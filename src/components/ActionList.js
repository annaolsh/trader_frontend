import React from 'react'
import Action from '../components/Action.js';


export default (props) => {
  return(
    <div>
      <table class="table-fill">
        <tbody class="table-hover">
          <tr>
            <th class="text-left">
              <h3>
                Date & Time
              </h3>
            </th>
            <th class="text-left">
              <h3>
                Action
              </h3>
            </th>
            <th class="text-left">
              <h3>
                # of stocks
              </h3>
            </th>
            <th class="text-left">
              <h3>
                Price for stock
              </h3>
            </th>
            <th class="text-left">
              <h3>
                Profit
              </h3>
            </th>
          </tr>
          {props.actionList.map(action => {
            return(
              <Action action={action}/>
            )
          }).reverse()}
        </tbody>
      </table>
    </div>
  )
}
