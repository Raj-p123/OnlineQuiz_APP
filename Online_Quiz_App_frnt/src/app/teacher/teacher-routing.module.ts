import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { TeacherDashboardComponent } from './dashboard/dashboard';
import { ManageQuizComponent } from './manage-quiz/manage-quiz';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'dashboard', component: TeacherDashboardComponent, canActivate: [AuthGuard] },
  { path: 'manage-quiz', component: ManageQuizComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
