import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

interface Result {
  studentName: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

@Component({
  selector: 'app-view-result',
  imports: [CommonModule, DatePipe],
  templateUrl: './view-result.html',
  styleUrl: './view-result.css'
})
export class ViewResultComponent implements OnInit {
  results: Result[] = [];

  ngOnInit() {
    // TODO: Fetch results from service
    this.results = [
      {
        studentName: 'John Doe',
        quizTitle: 'Math Quiz',
        score: 8,
        totalQuestions: 10,
        date: new Date()
      },
      {
        studentName: 'Jane Smith',
        quizTitle: 'Science Quiz',
        score: 7,
        totalQuestions: 10,
        date: new Date()
      }
    ];
  }
}
