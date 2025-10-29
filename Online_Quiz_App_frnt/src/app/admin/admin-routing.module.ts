import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.AdminDashboardComponent), canActivate: [AuthGuard] },
  { path: 'manage-user', loadComponent: () => import('./manage-user/manage-user').then(m => m.ManageUsersComponent), canActivate: [AuthGuard] },
  { path: 'manage-quiz', loadComponent: () => import('./manage-quiz/manage-quiz').then(m => m.ManageQuizzesComponent), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
