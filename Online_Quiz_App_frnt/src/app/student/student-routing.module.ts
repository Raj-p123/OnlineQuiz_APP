import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard').then(m => m.StudentDashboardComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'quiz-list', 
    loadComponent: () => import('./quiz-list/quiz-list').then(m => m.QuizListComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'quiz-category', 
    loadComponent: () => import('./quiz-category/quiz-category').then(m => m.QuizCategoryComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'play-quiz/:category',  // ✅ FIXED: changed from ':id' to ':category'
    loadComponent: () => import('./quiz-play/quiz-play').then(m => m.PlayQuizComponent), 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'result', 
    loadComponent: () => import('./quiz-result/quiz-result').then(m => m.ResultComponent), 
    canActivate: [AuthGuard] 
  },
  {
  path: 'quiz-history',
  loadComponent: () => import('./quiz-history/quiz-history')
    .then(m => m.QuizHistoryComponent),
  canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}