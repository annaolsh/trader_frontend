import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom'

class LogInForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  // handleSubmit(e){
  //   e.preventDefault()
  //   var component = this
  //   logIn(this.state)
  //     .then(res => {
  //       //console.log("Response ", res)
  //       if (res.error) {
  //         return
  //       }
  //       localStorage.setItem('jwt', res.token)
  //       localStorage.setItem('id', res.user.id)
  //       // localStorage.setItem('username', res.user.username)
  //       // localStorage.setItem('wallet', res.user.wallet)
  //       // localStorage.setItem('shares', res.user.shares)
  //
  //       component.props.storage()
  //       component.props.history.push('/game')
  //     })
  // }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Username</label>
        <input type='text' value={this.state.username} onChange={ e => this.handleChange('username', e.target.value)}/>
        <label>Password</label>
        <input type='password' value={this.state.password}onChange={ e => this.handleChange('password', e.target.value)} />
        <input type='submit' value='Log In' />
      </form>
    )
  }
}

export default withRouter(LogInForm);
