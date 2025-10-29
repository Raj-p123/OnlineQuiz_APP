import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageQuizComponent } from '../manage-quiz/manage-quiz';


@Component({
  selector: 'app-dashboard',
  imports: [ManageQuizComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})


export class TeacherDashboardComponent implements OnInit {
  teacherName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.teacherName = user.name || 'Teacher';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
