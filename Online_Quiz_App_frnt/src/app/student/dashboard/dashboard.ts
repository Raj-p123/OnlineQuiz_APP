import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class StudentDashboardComponent implements OnInit {

  studentName: string | null = '';
  totalQuizzes = 0;
  quizzesTaken = 0;
  averageScore = 0;
  motivationalQuote = '';
  topPlayers: any[] = [];
  currentYear = new Date().getFullYear();

  constructor(private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentName = localStorage.getItem('studentName') || 'Student';
    const studentId = Number(localStorage.getItem('studentId')) || 1; // fallback for now
    this.setRandomQuote();

    // ✅ Load stats and leaderboard
    this.loadDashboard(studentId);
    this.loadLeaderboard();
  }

  loadDashboard(studentId: number) {
    this.studentService.getDashboardData(studentId).subscribe({
      next: (res) => {
        this.totalQuizzes = res.totalQuizzes;
        this.quizzesTaken = res.attempted;
        this.averageScore = Math.round(res.averageScore);
      },
      error: (err) => console.error('Error loading dashboard data:', err)
    });
  }

  loadLeaderboard() {
    this.studentService.getLeaderboard().subscribe({
      next: (data) => this.topPlayers = data,
      error: (err) => console.error('Error loading leaderboard:', err)
    });
  }

  goToTakeQuiz() { this.router.navigate(['/student/quiz-category']); }
  goToLeaderboard() { this.router.navigate(['/student/leaderboard']); }
  goToQuizHistory() { this.router.navigate(['/student/quiz-history']); }
  goToProfile() { this.router.navigate(['/student/profile']); }

  setRandomQuote() {
    const quotes = [
      'Success is the sum of small efforts repeated daily.',
      'Push yourself, because no one else is going to do it for you.',
      'You don’t have to be great to start, but you have to start to be great.',
      'Every quiz is a step closer to mastery.',
      'Keep learning, keep growing 🌱'
    ];
    this.motivationalQuote = quotes[Math.floor(Math.random() * quotes.length)];
  }
}
