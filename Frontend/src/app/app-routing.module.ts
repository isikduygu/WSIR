import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalityResultComponent } from './personality-result/personality-result.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';

const routes: Routes = [
  { path: 'personalityResult', component: PersonalityResultComponent },
  { path: 'test', component: QuizQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }