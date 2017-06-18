import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class Chart extends Component {

  // constructor(props){
  //   super(props)
  //   this.state={
  //     data: this.props.data
  //   }
  // }
  //
  // data(canvas){
  //   debugger
  //       const ctx = canvas.getContext("2d")
  //       const gradient = ctx.createLinearGradient(0,0,100,0);
  //       this.setState
  //       return ({
  //
  //           backgroundColor: gradient
  //       })
  // }
  //
  // componentDidMount(){
  //   const ctx = canvas.getContext("2d")
  //   const gradient = ctx.createLinearGradient(0,0,100,0);
  //   this.setState({
  //
  //   })
  // }


  render() {
    return (
      <div>
        <br/>
          <Line className="line-color" data={this.props.data} width={100} height={300}
          options={
            {
              backgroundColor: "yellow",
              maintainAspectRatio: false,
              legend: {
                display: false
              },
              scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14
                    }
                }]
            }
            }
          }/>
      </div>
    )
  }
}
