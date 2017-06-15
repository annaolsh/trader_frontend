import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class LogOut extends Component {

  componentDidMount(){
    localStorage.clear()
    this.props.history.push('/login')
  }

  render(){
    return null
  }
}

export default withRouter(LogOut)
