import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalityResultComponent } from './personality-result/personality-result.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { HomeComponent } from './home/home.component';
import { PersonalityTypePageComponent } from './personality-type-page/personality-type-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PendingChangesGuard } from 'src/Interfaces/component-can-deactivate';
import { NotFoundComponent } from './not-found/not-found.component';
import { RecommendedBookComponent } from './recommended-book/recommended-book.component';


const routes: Routes = [
  { path: 'personalityResult/:id', component: PersonalityResultComponent },
  { path: 'test', component: QuizQuestionComponent}, //canDeactivate: [PendingChangesGuard]
  { path: '', component: HomeComponent },
  { path: 'KişilikTipleri', component: PersonalityTypePageComponent },
  { path: 'İletişim', component: ContactPageComponent },
  { path: 'KitapÖnerisi/:id', component: RecommendedBookComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }