import { Component, OnInit } from '@angular/core';
import { BookRecommendationService } from 'src/Services/book-recommendation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recommended-book',
  templateUrl: './recommended-book.component.html',
  styleUrls: ['./recommended-book.component.css'],
})
export class RecommendedBookComponent implements OnInit {
  constructor(
    private bookRecommendedService: BookRecommendationService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getBookResults()
  }

  selected = true;
  results: any;
  id!: any;

  changePage() {
    this.selected = !this.selected;
  }

 getBookResults() {
    this.spinner.show(); // show the spinner
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.bookRecommendedService
        .getBookRecommendations(this.id)
        .subscribe((results) => {
          this.results = results;
          console.log(this.results);
  
          // Hide the spinner inside the subscribe callback
          this.spinner.hide();
        });
    });
  }
  
  
}
