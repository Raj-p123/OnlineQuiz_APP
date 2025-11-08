import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './dashboard/dashboard';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    TeacherDashboardComponent,
    AddQuizComponent,
    ManageQuizComponent,
    ViewResultComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
