import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz, StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  imports: [CommonModule],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.css'
})


export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = true;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getAllQuizzes().subscribe({
      next: data => { this.quizzes = data; this.loading = false; },
      error: _ => { this.quizzes = []; this.loading = false; }
    });
  }

  startQuiz(quiz: Quiz) {
    this.router.navigate(['/student/play-quiz', quiz.id]);
  }
}
