import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) },

  // ✅ Newly added routes for static pages
  { path: 'about', loadComponent: () => import('./about.component/about.component').then(m => m.AboutComponent) },
  { path: 'faq', loadComponent: () => import('./faq.component/faq.component').then(m => m.FaqComponent) },
  { path: 'contact', loadComponent: () => import('./contact.component/contact.component').then(m => m.ContactComponent) },

  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'teacher', loadChildren: () => import('./teacher/teacher-routing.module').then(m => m.TEACHER_ROUTES) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'student/dashboard', loadComponent: () => import('./student/dashboard/dashboard').then(m => m.StudentDashboardComponent) },
  { path: '', redirectTo: '/student/dashboard', pathMatch: 'full' }
];
