import { Component, Input} from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';

const COLORS = ['#3498db', '#b71919', '#669c3e', '#f29154'];

@Component({
  selector: 'app-performance-chart',
  template: `
    <div>
      <canvas id="canvas">{{ chart }}</canvas>
    </div>
  `
})
export class PerformanceChartComponent {

  @Input() set performance(value: any) {
    this.prepareChart([...value]);
  }

  constructor() { }

  chart = [];

  private prepareChart(performanceData) {
    performanceData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const datasets = [];

    for (let i = 1; i < 5; i++) {
      const taskData = performanceData.filter(item => item.task === i);
      datasets.push({
        label: i + '. zadanie',
        data: taskData.map(item => ({x: moment(item.timestamp).toDate(), y: +item.ratio})),
        borderColor: COLORS[i - 1],
        fill: false,
        lineTension: 0
      });
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: performanceData.map(item => moment(item.timestamp).toDate()),
        datasets: datasets
      },
      options: {
        legend: { display: true },
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
            distribution: 'series'
          }],
          yAxes: [{ display: true }],
        }
      }
    });
  }

}
