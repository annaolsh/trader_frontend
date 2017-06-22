import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom'
// import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

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

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }



  render(){
    return (
      <div class="overlay">
        <form className="sign-up-from" onSubmit={this.handleSubmit.bind(this)} >
          <div className="con">
            <header className="head-form">
              <h2>Log In</h2>
              <p>login here using your username and password</p>
            </header>
            <br/>
            <div className="field-set">

              <input className="form-input" id="txt-input" type="text" placeholder="@UserName" value={this.state.username} onChange={ e => this.handleChange('username', e.target.value)}/>
              <br/>

              <input className="form-input" type="password" placeholder="Password" id="pwd" name="password" value={this.state.password} onChange={ e => this.handleChange('password', e.target.value)} />
              <button className="form-button" type='submit'>Log In</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(LogInForm);
