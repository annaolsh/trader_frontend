import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class ActionsTable extends React.Component {

  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPage: 25,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      hideSizePerPage: true  //You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    const data = this.props.actionList
    return (
      <div id="table">
        <BootstrapTable className="action-list"
          data={ data }
          pagination={ true }
          options={ options }>
          <TableHeaderColumn dataField='date' isKey>Date & Time</TableHeaderColumn>
          <TableHeaderColumn dataField='action'>Action</TableHeaderColumn>
          <TableHeaderColumn dataField='stocks'># of stocks</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Price per stock</TableHeaderColumn>
          <TableHeaderColumn dataField='profit'>Profit</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
