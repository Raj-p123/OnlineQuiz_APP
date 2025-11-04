import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

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
    category: '',
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

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  addQuestion() {
    if (
      !this.question.text.trim() ||
      !this.question.option1.trim() ||
      !this.question.option2.trim() ||
      !this.question.option3.trim() ||
      !this.question.option4.trim() ||
      !this.question.correctAnswer.trim()
    ) {
      if (isPlatformBrowser(this.platformId)) {
        alert('⚠️ Please fill all fields before adding a question.');
      }
      return;
    }

    // ✅ Push question object
    this.quiz.questions.push({ ...this.question });

    // ✅ Reset fields
    this.question = {
      text: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    };
  }

  addQuiz() {
    if (
      !this.quiz.title.trim() ||
      !this.quiz.description.trim() ||
      !this.quiz.category.trim() ||
      this.quiz.questions.length === 0
    ) {
      if (isPlatformBrowser(this.platformId)) {
        alert('⚠️ Please fill quiz details and add at least one question.');
      }
      return;
    }

    console.log('📤 Sending quiz:', this.quiz);

    this.http.post('http://localhost:8080/online_quiz_db/api/quiz/add', this.quiz).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          alert('✅ Quiz and Questions saved successfully!');
        }
        this.quiz = { title: '', description: '', category: '', questions: [] };
      },
      error: (err) => {
        console.error('❌ Server error:', err);
        if (isPlatformBrowser(this.platformId)) {
          alert('❌ Failed to save quiz. Please check backend.');
        }
      }
    });
  }
}
