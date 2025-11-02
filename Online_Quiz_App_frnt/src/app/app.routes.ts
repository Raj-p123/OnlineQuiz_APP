import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './student/dashboard/dashboard';
import { TeacherDashboardComponent } from './teacher/dashboard/dashboard';
import { AddQuizComponent } from './teacher/add-quiz/add-quiz';
import { ManageQuizComponent } from './teacher/manage-quiz/manage-quiz';
import { ViewResultComponent } from './teacher/view-result/view-result';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: '', redirectTo: '/student/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'add-quiz', component: AddQuizComponent },
  { path: 'manage-quiz', component: ManageQuizComponent },
  { path: 'view-result', component: ViewResultComponent }
];
