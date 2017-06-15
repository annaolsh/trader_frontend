import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import './App.css';
import TradeSimulatorContainer from './containers/TradeSimulatorContainer.js';
import NavBar from './components/NavBar.js';
import LogInForm from './user/LogInForm.js';
import SignUpForm from './user/SignUpForm.js';
import LogOut from './user/LogOut.js';
import { logIn, signUp } from './components/apiCalls.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    if(!!localStorage.jwt){
      fetch(`http://localhost:3000/users/${localStorage.id}`, {
        headers: {
        'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            user: {
              id: data.id,
              username: data.username,
              wallet: data.wallets[0].amount,
              shares: data.shares
            }
          })
        })
    }
  }

  handleSignUp(username, password){
    signUp(username, password)
    .then(res => {
      if(res.error){
        return
      }
      localStorage.setItem('jwt', res.token)
      localStorage.setItem('id', res.user.id)
      this.setState({user: res.user})
      this.props.history.push('/game')
    })
  }

  handleLoginSubmit(username, password) {
    logIn(username, password)
      .then(res => {
        if (res.error) {
          return
        }
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('id', res.user.id)
        this.setState({user: res.user})
        this.props.history.push('/game')
      })
  }

  changeWalletAmount(data){
    this.setState({
      user: {
        id: this.state.user.id,
        username: this.state.user.username,
        wallet: data,
        shares: this.state.user.shares
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/login' render={() => <LogInForm onSubmit={this.handleLoginSubmit.bind(this)}/>} />
          <Route path='/logout' render={() => <LogOut />} />
          <Route path='/signup' render={() => <SignUpForm handleSignUp={this.handleSignUp.bind(this)}/>} />
          <Route path='/game' render={() =>
            <TradeSimulatorContainer
              currentUser={this.state.user}
              changeWalletAmount={this.changeWalletAmount.bind(this)}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
