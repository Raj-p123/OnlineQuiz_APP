import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { AddQuizComponent } from '../add-quiz/add-quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-manage-quiz',
  imports: [CommonModule, FormsModule, AddQuizComponent],
  templateUrl: './manage-quiz.html',
  styleUrl: './manage-quiz.css'
})

export class ManageQuizComponent implements OnInit {
  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
      },
      error: (err) => {
        console.error('Error fetching quizzes:', err);
      }
    });
  }
}
