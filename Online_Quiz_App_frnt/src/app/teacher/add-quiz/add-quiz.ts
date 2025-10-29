import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quiz.html',
  styleUrl: './add-quiz.css'
})

export class AddQuizComponent {
  @Output() quizAdded = new EventEmitter<any>();

  quiz = {
    id: Math.floor(Math.random() * 10000),
    title: '',
    description: ''
  };

  addQuiz() {
    this.quizAdded.emit(this.quiz);
    alert('Quiz Added Successfully!');
  }
}
