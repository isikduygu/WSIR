import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgApexchartsModule } from "ng-apexcharts";
import { PersonalityResultComponent } from './personality-result/personality-result.component'
import { AppRoutingModule } from './app-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { PersonalityTypePageComponent } from './personality-type-page/personality-type-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InfoBoxComponent } from './info-box/info-box.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { PendingChangesGuard } from 'src/Interfaces/component-can-deactivate';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizQuestionComponent,
    HomeComponent,
    PersonalityTypePageComponent,
    ContactPageComponent,
    InfoBoxComponent,
    PersonalityResultComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatRadioModule,
    MatProgressBarModule,
    NgApexchartsModule,
    AppRoutingModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [PendingChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
