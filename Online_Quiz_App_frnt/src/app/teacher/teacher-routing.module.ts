import { Routes } from '@angular/router';

// ✅ Import Auth Guard
import { AuthGuard } from '../auth/auth.guard';

// ✅ Import all teacher components
import { TeacherDashboardComponent } from './dashboard/dashboard';
import { ManageQuizComponent } from './manage-quiz/manage-quiz';
import { ProfileComponent } from './profile/profile.component';
import { AddQuizComponent } from './add-quiz/add-quiz';
import { ViewResultComponent } from './view-result/view-result';

// ✅ Define all routes for teacher
export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: TeacherDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-quiz',
        component: ManageQuizComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'view-result',
        component: ViewResultComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      // Default redirect → dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
