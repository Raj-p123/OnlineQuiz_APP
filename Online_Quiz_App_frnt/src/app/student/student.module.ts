import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { StudentDashboardComponent } from './dashboard/dashboard';
import { QuizListComponent } from './quiz-list/quiz-list';
import { PlayQuizComponent } from './quiz-play/quiz-play';
import { ResultComponent } from './quiz-result/quiz-result';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    QuizListComponent,
    PlayQuizComponent,
    ResultComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
