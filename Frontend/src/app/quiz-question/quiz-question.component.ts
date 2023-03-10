import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonalityResult } from 'src/Interfaces/PersonalityResult';
import { PersonalityService } from 'src/Services/PersonalityService';
import { QuestionsService } from 'src/Services/QuestionsService';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  
  results!: PersonalityResult;
  name: string = 'Beetty';
  questions!: any[];
  progressBarValue = 0;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  currentPageNumber = 1;
  questionsPerPage = 5;
  lastPageNumber!: number;
  answers: any[] = [];

  constructor(
    private readonly personalityService: PersonalityService,
    private questionsService: QuestionsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getQuestions();
    this.lastPageNumber = Math.ceil(50 / this.questionsPerPage);
  }

  onSubmit() {
      this.spinner.show(); // show the spinner
      setTimeout(() => {
        this.spinner.hide(); // hide the spinner after some time
      }, 2000);
    console.log(this.answers.filter((answer) => answer !== undefined)); // do something with the selected answers

    // call the service to get the results
    this.personalityService
      .sendResults(this.name ,this.answers.filter((answer) => answer !== undefined))
      .subscribe((results: PersonalityResult) => {
        console.log(results);
        console.log(results.id);
        console.log(results["id"]);
        this.router.navigate(['personalityResult', results.id]);
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
  answersSelected: any = {};

  onAnswerSelected(questionId : number) {
    // console.log(this.answers[questionId])
    //  const selectedAnswers = Object.values(this.answers[questionId]);
    // console.log(selectedAnswers)
    // const numSelected = selectedAnswers.filter((a: any) => a != null).length;
    // this.progressBarValue = (numSelected / Object.keys(this.answersSelected).length) * 100;
  }
  answeredQuestions = [];
  updateProgressBar(questionId: any) {
    if (!this.answeredQuestions.includes(questionId as never)){
      this.answeredQuestions.push(questionId as never);
    }
    this.progressBarValue = this.answeredQuestions.length * 2;
  }
  
}



