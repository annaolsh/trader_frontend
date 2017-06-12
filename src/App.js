import React, { Component } from 'react';


//import logo from './logo.svg';
import './App.css';
import TradeSimulatorContainer from './containers/TradeSimulatorContainer.js';
import NavBar from './components/NavBar.js';

class App extends Component {
  render() {
    return (
        <div>
          <NavBar />
          <TradeSimulatorContainer />
        </div>

    );
  }
}

export default App;
