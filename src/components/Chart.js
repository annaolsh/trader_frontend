import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class Chart extends Component {
  debugger
  render() {
    return (
      <div>
        <br/>
          <Line className="line-color" data={this.props.data} width={100} height={500} padding={100}
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
                        fontColor: 'rgb(73,102,123)',
                        fontSize: 14,
                        //beginAtZero: true
                    },
                    gridLines: {
                      color: 'rgb(73,102,123)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'rgb(73,102,123)',
                        fontSize: 14
                    },
                    gridLines: {
                      color: 'rgb(73,102,123)'
                    }
                }]
            }
            }
          }/>
      </div>
    )
  }
}
