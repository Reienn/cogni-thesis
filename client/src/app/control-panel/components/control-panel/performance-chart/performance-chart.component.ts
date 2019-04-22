import { Component, Input} from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { MatSelectChange } from '@angular/material';
import { Performance } from '../../../../gameplay/models/game-data.data';

const COLORS = ['#3498db', '#b71919', '#669c3e', '#f29154'];


interface PerformanceWithRatio extends Performance {
  ratio?: string;
}
@Component({
  selector: 'app-performance-chart',
  template: `
    <mat-form-field *ngIf="caseIds && caseIds.length" appearance="outline" class="select-chart-case">
      <mat-label>Wybierz sprawę</mat-label>
      <mat-select (selectionChange)="prepareChart($event)">
        <mat-option *ngFor="let id of caseIds" [value]="id">Sprawa {{id}}.</mat-option>
      </mat-select>
    </mat-form-field>
    <div>
      <canvas id="canvas">{{ chart }}</canvas>
    </div>
  `
})
export class PerformanceChartComponent {

  @Input() performance: PerformanceWithRatio[];
  @Input() set currentCase(value: any) {
    const ids = [];
    for (let i = 1; i < value + 1; i ++) {
      ids.push(i);
    }
    this.caseIds = ids;
  }
  @Input() type: string;

  caseIds: number[];
  chart: Chart;

  constructor() { }

  prepareChart(change: MatSelectChange) {
    if (this.chart) {
      this.chart.destroy();
    }
    const performanceData = this.performance.filter(item => item.case === change.value).map(item => {
      item.ratio = (item.points / item.maxPoints).toFixed(2);
      return item;
    });
    performanceData.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const datasets = [];

    for (let i = 1; i < 5; i++) {
      const taskData = performanceData.filter(item => item.task === i);
      datasets.push({
        label: i + '. zadanie',
        data: taskData.map(item => ({x: moment(item.timestamp), y: +item.ratio})),
        borderColor: COLORS[i - 1],
        fill: false,
        lineTension: 0
      });
    }

    const chart = new Chart('canvas', {
      type: this.type,
      data: {
        // labels: performanceData.map(item => moment(item.timestamp)),
        datasets: datasets
      },
      options: {
        legend: { display: true },
        scales: {
          xAxes: [{
            display: true,
            distribution: 'series',
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {month: 'MM.YYYY'},
              tooltipFormat: 'DD.MM.YYYY HH:mm'
            },
            bounds: 'ticks'
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Poprawność (punkty / max)'
            }
          }],
        },
        // tooltips: {
        //   callbacks: {
        //     label: function(tooltipItem, data) {
        //       return `${tooltipItem.xLabel}: ${tooltipItem.yLabel}`;
        //     }
        //   }
        // }
      }
    });
    setTimeout(() => {
      this.chart = chart;
    });
  }

}
