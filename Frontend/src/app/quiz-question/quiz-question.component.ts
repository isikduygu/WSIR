import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonalityResult } from 'src/Interfaces/PersonalityResult';
import { PersonalityService } from 'src/Services/personality.service';
import { QuestionsService } from 'src/Services/questions.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoBoxComponent } from '../info-box/info-box.component';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/Interfaces/component-can-deactivate';
import { BreakpointObserver } from '@angular/cdk/layout';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit , ComponentCanDeactivate {

   // @HostListener allows us to also guard against browser refresh, close, etc.
   @HostListener('window:beforeunload')
   canDeactivate(): Observable<boolean> | any {
     // insert logic to check if there are pending changes here;
     // returning true will navigate without confirmation
     // returning false will show a confirm dialog before navigating away
   }
  
  results!: PersonalityResult;
  name: string = '';
  age: string = '';
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

  list = ['Çocuk 7-12',' Genç 13-17', 'Genç Yetişkin 18-26', 'Yetişkin 27+'];
  model! : any;
  selected = true;
  submitted = false;
  personalInfoForm! : FormGroup;
  isSmallScreen!: boolean;


  constructor(
    private readonly personalityService: PersonalityService,
    private questionsService: QuestionsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.getQuestions();
    this.lastPageNumber = Math.ceil(50 / this.questionsPerPage);
    this.personalInfoForm = new FormGroup({
      name: new FormControl(" ", [Validators.required]),
      age: new FormControl(" ", [Validators.required])
    });
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  onSubmit() {
    if(this.progressBarValue == 100){
      this.spinner.show(); // show the spinner
      console.log(this.answers.filter((answer) => answer !== undefined)); // do something with the selected answers

      // call the service to get the results
      this.personalityService
        .sendResults(this.name ,this.age, this.answers.filter((answer) => answer !== undefined))
        .subscribe((results: PersonalityResult) => {
          console.log(results);
          console.log(results.id);
          console.log(results["id"]);
          this.router.navigate(['personalityResult', results.id]);
        });
      setTimeout(() => {
        this.spinner.hide(); // hide the spinner after some time
      }, 2000);
    }else{
        const ref: MatDialogRef<InfoBoxComponent> = this.dialog.open(
          InfoBoxComponent,
          {
            data: {
              message: 'Tüm soruları cevapladığınızdan emin olun.',
              exit: 'Tamam',
            },
          }
        );
    }
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

  answeredQuestions = [];
  updateProgressBar(questionId: any) {
    if (!this.answeredQuestions.includes(questionId as never)){
      this.answeredQuestions.push(questionId as never);
    }
    this.progressBarValue = this.answeredQuestions.length * 2;
  }
  goToTest(){
    if (this.personalInfoForm.valid) {
      this.spinner.show(); // show the spinner
      this.selected = !this.selected;
      setTimeout(() => {
        this.spinner.hide(); // hide the spinner after some time
      }, 1000);
    }
}
}
