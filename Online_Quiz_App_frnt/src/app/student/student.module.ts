import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard';
import { QuizListComponent } from './quiz-list/quiz-list';
import { PlayQuizComponent } from './quiz-play/quiz-play';
import { ResultComponent } from './quiz-result/quiz-result';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
