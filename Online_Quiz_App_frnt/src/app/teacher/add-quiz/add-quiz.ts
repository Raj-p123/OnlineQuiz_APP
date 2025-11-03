import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-quiz.html',
  styleUrls: ['./add-quiz.css']
})

export class AddQuizComponent {
  quiz = {
    title: '',
    description: '',
    questions: [] as any[]
  };

  question = {
    text: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  };

  constructor(private http: HttpClient) {}

  addQuestion() {
    if (this.question.text && this.question.correctAnswer) {
      this.quiz.questions.push({ ...this.question });
      this.question = { text: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '' };
    } else {
      alert('⚠️ Please fill question and correct answer.');
    }
  }

  addQuiz() {
    if (!this.quiz.title || !this.quiz.description || this.quiz.questions.length === 0) {
      alert('⚠️ Please fill quiz details and add at least one question.');
      return;
    }

    this.http.post('http://localhost:8080/online_quiz_db/api/quiz/add', this.quiz, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('✅ Quiz saved successfully!');
          this.quiz = { title: '', description: '', questions: [] };
        },
        error: err => {
          console.error('❌ Error saving quiz:', err);
          alert('❌ Failed to save quiz. Check backend console & CORS.');
        }
      });
  }
}
