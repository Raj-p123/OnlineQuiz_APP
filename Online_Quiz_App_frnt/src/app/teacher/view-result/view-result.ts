import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { QuizService } from '../quiz.service';

interface QuizResult {
  id: number;
  studentEmail: string;
  quizTitle: string;
  correct: number;
  total: number;
  percentage: number;
  submittedAt: string;
}


@Component({
  selector: 'app-view-result',
  imports: [CommonModule, DatePipe],
  templateUrl: './view-result.html',
  styleUrl: './view-result.css'
})


export class ViewResultComponent implements OnInit {
 results: QuizResult[] = [];
  loading = false;
  error: string | null = null;
  studentEmail: string = 'rajendra@example.com'; // replace with actual email (or from login)

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults() {
    this.loading = true;
    this.error = null;

    // You can use getAllResults() if it's admin view
    this.quizService.getResultsForStudent(this.studentEmail).subscribe({
      next: (data) => {
        console.log('✅ Results loaded:', data);
        this.results = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load results', err);
        this.error = '⚠️ Failed to load results. Please check backend or network.';
        this.loading = false;
      }
    });
  }
}
