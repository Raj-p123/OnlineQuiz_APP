import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe, NgIf, NgFor, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService, QuizAttempt } from '../student.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.html',
  styleUrls: ['./quiz-history.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, NgIf, NgFor, RouterModule]
})
export class QuizHistoryComponent implements OnInit {
  history: QuizAttempt[] = [];

  constructor(private studentService: StudentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.studentService.getQuizHistory().subscribe({
      next: (data: any) => {
        console.log('Quiz history fetched:', data);
        if (Array.isArray(data)) {
          this.history = data;
        } else if (data && data.history && Array.isArray(data.history)) {
          this.history = data.history;
        } else {
          this.history = [];
        }
        // Force UI update!
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load quiz history', err);
        this.history = [];
        this.cdr.detectChanges(); // Also force update on error
      }
    });
  }
}
