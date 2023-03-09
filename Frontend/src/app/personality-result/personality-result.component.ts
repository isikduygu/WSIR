import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { PersonalityService } from 'src/Services/PersonalityService';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors?: string[];
  yaxis?: ApexYAxis;
};

@Component({
  selector: 'app-personality-result',
  templateUrl: './personality-result.component.html',
  styleUrls: ['./personality-result.component.css'],
})
export class PersonalityResultComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;

  id!: any;
  results: any;

  ngOnInit(): void {
    this.getResults();
  }

  constructor(
    private personalityService: PersonalityService,
    private route: ActivatedRoute
  ) {
   this.chartOptions = {
    yaxis: {
      min: 0,
      max: 40,
    },
  series: [
    {
      name: 'Results',
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: 'bar',
  },
  title: {
    text: 'Sonuçlar',
  },
  xaxis: {
    categories: [
      'Agreeableness',
      'Conscientiousness',
      'Extraversion',
      'Neuroticism',
      'Openness',
    ],
    title: {
      text: 'Kişilik Tipi Sonuçları',
      style: {
        fontSize: '24px',
      },
    },
    labels: {
      style: {
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
        ],
        fontSize: "16px"
      }
    },
  },
  colors: []
};
  }

  getResults() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.personalityService
        .getPersonalityResult(this.id)
        .subscribe((results) => {
          this.results = results;
          console.log(this.results);

          // Assign the series data dynamically based on the results
          this.chartOptions.series = [
            {
              name: 'Results',
              data: [
                this.results.agreeableness,
                this.results.conscientiousness,
                this.results.extraversion,
                this.results.neuroticism,
                this.results.openness,
              ],
            },
          ];
          this.chartOptions.colors = [ 
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",]
        });
    });
  }
}
