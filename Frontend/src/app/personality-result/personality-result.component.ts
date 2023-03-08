import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-personality-result',
  templateUrl: './personality-result.component.html',
  styleUrls: ['./personality-result.component.css']
})
export class PersonalityResultComponent {
  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions: ChartOptions;


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      title: {
        text: 'My First Angular Chart'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
          style: {
            fontSize: '14px',
          },
        },
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
    };
  }
}
