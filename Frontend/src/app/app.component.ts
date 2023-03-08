import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PersonalityResult } from 'src/Interfaces/PersonalityResult';
import { PersonalityService } from 'src/Services/PersonalityService';
import { QuestionsService } from 'src/Services/QuestionsService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WSIR';

  results!: PersonalityResult;
  name: string = 'Beetty';
  // personalityTest: string[] = ['BABAAAABAAAAAAABAAAABBAAAAAABAAAABABAABAAABABABAABAAAAAABAAAAAABAAAAAA'];
  //answers = [5, 1, 4, 2, 5, 2, 4, 1, 4, 2, 5, 1, 4, 2, 5, 4, 5, 2, 4, 1, 2, 5, 1, 2, 5, 4, 3, 4, 2, 1, 4, 5, 4, 1, 5, 4, 2, 5, 1, 3, 4, 1, 2, 3, 4, 5, 3, 2, 1, 5]
  questions!: any[];

  constructor(
    private readonly personalityService: PersonalityService,
    private questionsService: QuestionsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.spinner.show(); // show the spinner
    setTimeout(() => {
      this.spinner.hide(); // hide the spinner after some time
    }, 2000);
    this.getQuestions();
    this.lastPageNumber = Math.ceil(50 / this.questionsPerPage);
  }

  currentPageNumber = 1;
  questionsPerPage = 5;
  lastPageNumber!: number;
  answers: any[] = [];

  onSubmit() {
    console.log(this.answers.filter((answer) => answer !== undefined)); // do something with the selected answers

    // call the service to get the results
    this.personalityService
      .sendResults(this.answers.filter((answer) => answer !== undefined))
      .subscribe((results: PersonalityResult) => {
        console.log(results);
      });
  }

  getQuestions() {
    this.questionsService
      .getQuestions(this.currentPageNumber, this.questionsPerPage)
      .subscribe((data) => {
        this.questions = data;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPageNumber = event.pageIndex + 1;
    this.getQuestions();
  }
}
