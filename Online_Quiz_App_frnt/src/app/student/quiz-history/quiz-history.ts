import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe, NgIf, NgFor, JsonPipe } from '@angular/common';
import { StudentService, QuizAttempt } from '../student.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.html',
  styleUrls: ['./quiz-history.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, NgIf, NgFor, JsonPipe] // <-- ADD CommonModule here
})
export class QuizHistoryComponent implements OnInit {
  history: QuizAttempt[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getQuizHistory().subscribe({
      next: (data) => {
        console.log('Quiz history fetched:', data);
        this.history = data;
      },
      error: (err) => {
        console.error('Failed to load quiz history', err);
      }
    });
  }
}
