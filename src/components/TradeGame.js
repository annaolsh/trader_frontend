import React from 'react'
import Chart from '../components/Chart.js';
import ActionList from '../components/ActionList.js';
import ActionsTable from '../components/ActionsTable.js';
import Companies from '../components/Companies.js';
import dollar2 from '../images/dollar2.png';
import User from '../components/User.js';
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap';
var Loader = require('react-loader');

export default (props) => {
  function onClick(){
    props.gameIsOnFunction();
    props.generator()
  }

  const userBoughtLess = !!props.userBoughtLess ? `You don't have money to buy all stocks. You've bought just ${props.lastAction.stocks} stocks` : null
  const showGrowth = !!props.gameIsOn ? `${props.growth}%` : null
  const canBuyStock = !!props.canBuyStock ? "" : "Not enough $. Try to sell first"
  const stocksSentence = props.user.shares < 0 ? "You owe stocks!": null
  const stocksQuantity = props.user.shares === 1 || props.user.shares === -1 ? "stock" : "stocks"
  const growth = props.showGrowth
  const growthColor = growth >= 0 ? "{color: green}" : "{color: red}"

  function stocksGrowth(){
    if(props.growth === 0){
      return <h3 style={{color: "rgb(255,255,255)"}}> {showGrowth}</h3>
    } else if (props.growth > 0) {
      return <h3 style={{color: "rgb(50,205,50)"}}> +{showGrowth}</h3>
    } else if (props.growth < 0) {
      return <h3 style={{color: "rgb(255,0,0)"}}> {showGrowth}</h3>
    } else {return null}
  }

  function renderLastAction(){
    var lastAction = props.lastAction
    if (!!lastAction) {
      // var numberOfStocks = lastAction.stocks > 1 ? `${lastAction.stocks} stocks for ${lastAction.price} per stock` : `${lastAction.stocks} stock for $${lastAction.price}`
      function numberOfStocks(){
        if(lastAction.stocks > 1){
          return(
            <h2><span id="last-action">{lastAction.stocks}</span> stocks for <span id="last-action">{lastAction.price}</span> per stock</h2>
          )
        } else {
          return(
            <h2><span id="last-action">{lastAction.stocks}</span> stock for <span id="last-action">${lastAction.price}</span></h2>
          )
        }
      }



      function lostOrGained(){
        if(lastAction.action === "bought"){
          return(
            <h2>You <span id="last-action">lost ${Math.abs(lastAction.profit)}`</span></h2>
          )
          } else {
            return(
              <h2>Your <span id="last-action">profit</span> is <span id="last-action">${lastAction.profit}</span></h2>
            )
        }
      }

      return (
        <div>
          <h2>You've just <span id="last-action">{lastAction.action}</span></h2>
          {numberOfStocks()}
          {lostOrGained()}
        </div>
      )
    } else { return null}
  }

  function dollarSign(){
    var lastAction = props.lastAction
    if(!!lastAction){
      return ( <img className={dollarSignAnimation()} id="dollar" src={dollar2} />)

    }
  }

  function dollarSignAnimation(){
    var lastAction = props.lastAction
    if (!!lastAction){
      return lastAction.action === "bought" ? "animated zoomOutUp" : "animated zoomInUp"
    }
  }

  return(
    <div>
      <Row className="show-grid">
        <Col xs={12} md={8}>
          <div className="game-settings">
            <h1 id="selected-company">{props.selectedCompany}</h1>
            <Companies handleSelectedCompany={props.handleSelectedCompany}  turnOnLoader={props.turnOnLoader} stopPreviousGame={props.stopPreviousGame}/>
          </div>
        </Col>

        <Col xs={12} md={4}>
          <User user={props.user}/>
        </Col>
      </Row>

      <Row className="show-grid" id="game-row">
          <Col xs={12} md={8}>
            <Loader loaded={props.loaded} lines={13} length={20} width={10} radius={30}
                    corners={1} rotate={0} direction={1} color="rgb(241, 101, 110)" speed={1}
                    trail={60} shadow={true} hwaccel={true} className="spinner"
                    zIndex={2e9} top="50%" left="50%" scale={1.00}
                    loadedClassName="loadedContent">
              <br/>

              <div className="game-field">
                <div id="chart-area">
                <Row className="show-grid">
                    <Button className="play-button" onClick={onClick} disabled={props.gameIsOn}>Play</Button>
                    <br/>
                    <br/>
                    <Button onClick={props.slower}> Slower </Button>

                    <Button onClick={props.faster}> Faster </Button>
                    <h3 id="speed">Speed is {props.speed/1000} sec</h3>
                    <Chart data={props.chartData}/>
                    <div className="growth">
                      {stocksGrowth()}
                      <h2 className="white-text-game-field">
                        {props.chartData.datasets[0].data[props.chartData.datasets[0].data.length-1]}
                      </h2>
                    </div>
                </Row>
                  <Row>
                    <Col xs={12} md={5}>
                        <h2>Choose number of stocks</h2>
                        <FormControl id="stocks-to-buy" type="number" min="0" step="1" value={props.sharesToBuy} onChange={props.handleChange}/>
                        <br/>
                        <Button className="raise" disabled={!props.userCanBuy} onClick={props.buy}>Buy!</Button>
                        <Button className="raise" disabled={!props.userCanBuy} onClick={props.sell}>Sell!</Button>
                        <p id="no-money">{`${canBuyStock}`}</p>
                        <p id="user-bought-less">{userBoughtLess}</p>
                        <h3 className="white-text-game-field">You have</h3>
                        <h2 className="white-text-game-field">{props.user.shares} {stocksQuantity} </h2>
                        <h3 style={{color: 'red'}}>{stocksSentence} </h3>
                    </Col>
                    <Col xs={12} md={4}>
                      <div id="helper-info">
                        <h2 id="wallet">Wallet: ${props.user.wallet}</h2>
                        <br/>
                        {renderLastAction()}
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <div>
                        {dollarSign()}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="triangle red"></div>
              </div>
              </Loader>
            </Col>
            <Col xs={6} md={4}>
              <ActionsTable actionList = {props.actions} />
            </Col>
      </Row>
    </div>
  )
}
