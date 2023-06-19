import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalityService } from 'src/Services/personality.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';

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
  categories = [];
  score = [];
  colors = [        
  "#AFEED1",
  "#F2D8AC",
  "#ACDEE0",
  "#EEC6DA",
  "#5f2d6e",]

  ngOnInit(): void {
    this.getResults();
  }

  constructor(
    private personalityService: PersonalityService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
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
      colors: this.colors,
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
        categories: this.categories,
        labels: {
          style: {
            colors: this.colors,
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
        .pipe(
          catchError(error => {
            if (error.status === 404) {
              this.router.navigate(['**'])
            } else {
              // Handle other errors here
            }
            return throwError(error);
          })
        ).subscribe((results) => {
          this.results = results;
          console.log(this.results);
          results.personalityType.forEach((element: never) => {
           this.categories.push(element['type'])
           this.score.push(element['score'] )
          });

          // Assign the series data dynamically based on the results
          this.chartOptions.series = [
            {
              name: 'Results',
              data: this.score,
            },
          ];
        });
    });
  }
  routerPage() {
    this.router.navigate(['KitapÖnerisi', this.id]);
}
}