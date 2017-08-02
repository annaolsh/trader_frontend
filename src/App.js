import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css';
import TradeSimulatorContainer from './containers/TradeSimulatorContainer.js';
import NavBar from './components/NavBar.js';
import LogInForm from './user/LogInForm.js';
import SignUpForm from './user/SignUpForm.js';
import LogOut from './user/LogOut.js';
import Home from './components/Home.js';
import { logIn, signUp } from './components/apiCalls.js'
import {Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    var component = this
    if(!!localStorage.jwt){
      fetch(`http://localhost:3000/users/${localStorage.id}`, {
        headers: {
        'Authorization': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(data => {
          component.setState({
            user: {
              id: data.user.id,
              username: data.user.username,
              wallet: data.wallet,
              shares: data.user.shares
            }
          })
        })
    }
  }

  handleSignUp(username, password){
    signUp(username, password)
    .then(data => {
      if(data.error){
        return
      }
      localStorage.setItem('jwt', data.token)
      localStorage.setItem('id', data.user.id)
      this.setState({user: data.user})
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

  changeUserState(data, callApi){
    this.setState({
      user: {
        id: this.state.user.id,
        username: this.state.user.username,
        wallet: parseFloat((parseFloat(this.state.user.wallet) + data.paid).toFixed(2)),
        shares: this.state.user.shares + data.sharesToBuy
      }
    }, callApi)
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12} >
            <NavBar />
        </Col>
      </Row>
          <div className="page-body">
            <Switch>
              <Route path='/home' render={() => <Home />} />
              <Route path='/login' render={() => <LogInForm onSubmit={this.handleLoginSubmit.bind(this)}/>} />
              <Route path='/logout' render={() => <LogOut />} />
              <Route path='/signup' render={() => <SignUpForm handleSignUp={this.handleSignUp.bind(this)}/>} />
              <Route exact path='/game' render={() =>
                <TradeSimulatorContainer
                  currentUser={this.state.user}
                  changeAppUserState={this.changeUserState.bind(this)}/>}/>
            </Switch>
          </div>
      </Grid>
    )
  }
}

export default withRouter(App);
