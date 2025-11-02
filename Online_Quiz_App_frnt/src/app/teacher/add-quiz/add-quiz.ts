import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-add-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css'
})

export class AddQuizComponent {
  quiz = {
    title: '',
    description: '',
    questions: [] as any[]
  };

  question = {
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  };

  constructor(private quizService: QuizService) {}

  addQuestion() {
    if (
      this.question.text.trim() &&
      this.question.options.every(opt => opt.trim() !== '') &&
      this.question.correctAnswer
    ) {
      this.quiz.questions.push({ ...this.question });
      this.question = { text: '', options: ['', '', '', ''], correctAnswer: '' };
    } else {
      alert('Please fill in all fields and select a correct answer.');
    }
  }

  addQuiz() {
    if (!this.quiz.title || !this.quiz.description || this.quiz.questions.length === 0) {
      alert('Please fill in all quiz details and add at least one question.');
      return;
    }

    this.quizService.addQuiz(this.quiz).subscribe({
      next: () => {
        alert('✅ Quiz added successfully!');
        this.quiz = { title: '', description: '', questions: [] };
      },
      error: (err) => {
        console.error('Error adding quiz:', err);
        alert('❌ Failed to add quiz');
      }
    });
  }
}
