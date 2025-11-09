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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
  this.loading = true;
  this.error = null;

  this.quizService.getAllResults().subscribe({
    next: (data: any) => {
      console.log('✅ Raw API response:', data);

      // handle both cases
      if (Array.isArray(data)) {
        this.results = data;
      } else if (data && Array.isArray(data.results)) {
        this.results = data.results;
      } else {
        this.results = [];
      }

      this.loading = false;
      console.log('✅ Parsed Results:', this.results);
    },
    error: (err) => {
      console.error('❌ Failed to load results', err);
      this.error = '⚠️ Unable to load quiz results. Please check backend.';
      this.loading = false;
    }
  });
}

}
