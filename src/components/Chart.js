import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

// Chart.pluginService.register({
// 			beforeDraw: function (chart, easing) {
// 				if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
// 					var helpers = Chart.helpers;
// 					var ctx = chart.chart.ctx;
// 					var chartArea = chart.chartArea;
//
// 					ctx.save();
// 					ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
// 					ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
// 					ctx.restore();
// 				}
// 			}
// 		});
//
// 		var config = {
//   type: 'line',
//   data: {
//     labels:["Label1","Label2","Label3","Label4"],
//     borderColor : "#00c4e7",
//     datasets: [
//       {
//         data: ["2","3","1","4"],
//         borderColor : "#00c4e7",
//         borderWidth : "3",
//         hoverBorderColor : "#000",
//         backgroundColor: [
//           "#f38b4a",
//           "#56d798",
//           "#ff8397",
//           "#6970d5"
//         ],
//         hoverBackgroundColor: [
//           "#f38b4a",
//           "#56d798",
//           "#ff8397",
//           "#6970d5"
//         ]
//       }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks:{
//           min : 0,
//           stepSize : 1,
//           fontColor : "#000",
//           fontSize : 14
//         },
//         gridLines:{
//           color: "#000",
//           lineWidth:2,
//           zeroLineColor :"#000",
//           zeroLineWidth : 2
//         },
//         stacked: true
//       }],
//       xAxes: [{
//         ticks:{
//           fontColor : "#000",
//           fontSize : 14
//         },
//         gridLines:{
//           color: "#fff",
//           lineWidth:2
//         }
//       }]
//     },
//     responsive:false,
//     chartArea: {
// 					backgroundColor: 'rgb(30,39,48)'
// 				}
//   }
// };
//
// 		var ctx = document.getElementById("barChart").getContext("2d");
// 		new Chart(ctx, config);

export default class Chart extends Component {

  render() {
    return (
      <div>
        <br/>
        <Line data={this.props.data} width={100} height={300} options={{maintainAspectRatio: false, legend: {
            display: false}} }/>
      </div>
    )
  }
}
