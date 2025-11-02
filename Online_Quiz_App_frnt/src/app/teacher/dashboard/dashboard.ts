import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import standalone components (optional)
import { ManageQuizComponent } from '../manage-quiz/manage-quiz';
import { AddQuizComponent } from '../add-quiz/add-quiz';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true, // ✅ Important for Angular standalone component
  imports: [ManageQuizComponent, AddQuizComponent], // ✅ Only if you actually use them in template
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // ✅ should be styleUrls, not styleUrl
})
export class TeacherDashboardComponent implements OnInit {
  teacherName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.teacherName = parsedUser.name || 'Teacher';
    } else {
      this.teacherName = 'Teacher';
    }
  }

  // ✅ Navigate to Add Quiz page
  goToAddQuiz(): void {
    this.router.navigate(['/add-quiz']);
  }

  // ✅ Navigate to Manage Quiz page
  goToManageQuiz(): void {
    this.router.navigate(['/manage-quiz']);
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
