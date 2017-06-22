import React, { Component } from 'react';

export default class Companies extends Component {
  constructor(){
    super()
    this.state={
      companies: [
        {Facebook: 'FB'},
        {Apple: 'AAPL'},
        {Microsoft: 'MSFT'}
      ],
      companiesKeys: [],
      selectedCompany: {'Apple': 'AAPL'}
    }
  }

  componentDidMount(){
    const companiesKeys = this.state.companies.map(company => Object.keys(company))
    this.setState({
      companiesKeys: [].concat.apply([], companiesKeys)
    })
    var selectedCompany = this.state.selectedCompany
  }

  handleSelectedCompany(selectedCompany){
    this.props.stopPreviousGame()
    this.props.turnOnLoader()
    this.setState({
      selectedCompany: selectedCompany
    }, this.sendRequest)
  }

  sendRequest(){
    var companies = this.state.companies
    var selectedCompany = this.state.selectedCompany
    var symbol = companies.find( company => company[selectedCompany])[selectedCompany]
    this.props.fetchLiveDataForSelectedCompany(selectedCompany, symbol)
  }

  render(){
    return(
      <div>
        {this.state.companiesKeys.map( (company, i) => {
          return(
            <div key={i} className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={company} onClick={ (e => this.handleSelectedCompany(e.target.value))}/> {company}
              </label>
            </div>
          )

        })}
      </div>
    )
  }
}

//className="form-check form-check-inline"
