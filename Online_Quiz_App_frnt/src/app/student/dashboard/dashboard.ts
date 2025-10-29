import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})


export class DashboardComponent implements OnInit {
  username = '';
  quizCount = 0;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = user.name || 'Student';
    this.studentService.getQuizCount().subscribe({
      next: count => this.quizCount = count,
      error: _ => this.quizCount = 0
    });
  }

  goToList() {
    this.router.navigate(['/student/quiz-list']);
  }
}
