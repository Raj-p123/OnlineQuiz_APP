import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './dashboard/dashboard';
import { AddQuizComponent } from './add-quiz/add-quiz';
import { ManageQuizComponent } from './manage-quiz/manage-quiz';
import { ViewResultComponent } from './view-result/view-result';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TeacherRoutingModule,
    TeacherDashboardComponent,
    AddQuizComponent,
    ManageQuizComponent,
    ViewResultComponent,
    ProfileComponent
  ]
})
export class TeacherModule { }
