import React from 'react'
import Action from '../components/Action.js';


export default (props) => {
  return(
    <div id="actions">
      <table className="table-fill">
        <tbody className="table-hover">
          <tr>
            <th className="text-left">
              <h3>
                Date & Time
              </h3>
            </th>
            <th className="text-left">
              <h3>
                Action
              </h3>
            </th>
            <th className="text-left">
              <h3>
                # of stocks
              </h3>
            </th>
            <th className="text-left">
              <h3>
                Price for stock
              </h3>
            </th>
            <th className="text-left">
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
