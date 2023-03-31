import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalityService } from 'src/Services/PersonalityService';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
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
      series: [
        {
          name: 'Results',
          data: [],
        }
      ],
      chart: {
        height: 400,
        type: "bar",
      },
      colors: [
        "#AFEED1",
        "#F2D8AC",
        "#ACDEE0",
        "#EEC6DA",
        "#88619A",
      ],
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: true
      },
      grid: {
        show: true
      },
      xaxis: {
        categories: [
                'Agreeableness',
                'Conscientiousness',
                'Extraversion',
                'Neuroticism',
                'Openness',
              ],
        labels: {
          style: {
            colors: [
              "#AFEED1",
              "#F2D8AC",
              "#ACDEE0",
              "#EEC6DA",
              "#88619A",
            ],
            fontSize: "12px"
          }
        }
      }
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
        });
    });
  }
}
