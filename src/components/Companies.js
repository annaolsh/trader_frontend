import React, { Component } from 'react';
import { fetchCompanies } from './apiCalls.js'

export default class Companies extends Component {
  constructor(){
    super()
    this.state={
      companies: [],
      companiesKeys: [],
      selectedCompany: ""
    }
  }

  componentDidMount(){
    fetchCompanies()
    .then(data => {
      this.setState({
        companies: data,
        selectedCompany: data[1]
      })
      this.props.handleSelectedCompany(data[1])
    })

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
    // var symbol = companies.find( company => company[selectedCompany])[selectedCompany]
    this.props.fetchLiveDataForSelectedCompany(selectedCompany)
  }

  render(){
    return(
      <div>
        {this.state.companies.map( (company, i) => {
          return(
            <div key={i} className="form-check form-check-inline">
              <label className="form-check-label">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={company} onClick={ (e => this.handleSelectedCompany(e.target.value))}/>
                  {company.name}
              </label>
            </div>
          )
        }
        )}

      </div>
    )
  }
}

// {this.state.companiesKeys.map( (company, i) => {
//   return(
//     <div key={i} className="form-check form-check-inline">
//       <label className="form-check-label">
//         <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={company} onClick={ (e => this.handleSelectedCompany(e.target.value))}/> {company}
//       </label>
//     </div>
//   )
//
// })}
