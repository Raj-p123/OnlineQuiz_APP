import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class StudentDashboardComponent implements OnInit {
  

  studentName: string | null = '';


  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToTakeQuiz() {
    this.router.navigate(['/student/quiz-category']);
  }

  goToLeaderboard() {
    // Ensure a leaderboard route/component exists!
    this.router.navigate(['/student/leaderboard']);
  }

  goToQuizHistory() {
    // Ensure a quiz-history route/component exists!
    this.router.navigate(['/student/quiz-history']);
  }
}
