import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService, Quiz } from '../student.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class StudentDashboardComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch quizzes:', err);
        this.loading = false;
      }
    });
  }
}
