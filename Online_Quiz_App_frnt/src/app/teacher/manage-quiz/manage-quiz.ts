import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-quiz.html',
  styleUrls: ['./manage-quiz.css']
})
export class ManageQuizComponent implements OnInit {
  quizzes: any[] = [];
  questions: any[] = [];
  editingQuiz: any = null;
  selectedQuiz: any = null;
  editingQuestion: any = null;
  addingQuestion: boolean = false;

  newQuestion = {
    text: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  };

  apiUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  // ✅ Load all quizzes
  loadQuizzes() {
    this.http.get<any[]>(`${this.apiUrl}/all`).subscribe({
      next: (data) => {
        console.log('✅ Quizzes loaded:', data);
        this.quizzes = data;
      },
      error: (err) => {
        console.error('❌ Failed to fetch quizzes:', err);
        alert('⚠️ Failed to load quizzes. Check backend or network.');
      }
    });
  }

  // ✅ View questions of a quiz
  viewQuiz(quiz: any) {
    this.selectedQuiz = quiz;
    this.addingQuestion = false;
    this.http.get<any[]>(`${this.apiUrl}/${quiz.id}/questions`).subscribe({
      next: (data) => {
        console.log('✅ Questions loaded:', data);
        this.questions = data;
      },
      error: (err) => {
        console.error('❌ Failed to load questions:', err);
        alert('⚠️ Failed to load questions.');
      }
    });
  }

  // ✅ Delete quiz
  deleteQuiz(id: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Quiz deleted successfully!');
          this.loadQuizzes();
          this.selectedQuiz = null;
        },
        error: (err) => console.error('❌ Failed to delete quiz', err)
      });
    }
  }

  // ✅ Edit quiz
  editQuiz(quiz: any) {
    this.editingQuiz = { ...quiz };
  }

  cancelEdit() {
    this.editingQuiz = null;
  }

  updateQuiz() {
    if (!this.editingQuiz) return;

    this.http.put(`${this.apiUrl}/update/${this.editingQuiz.id}`, this.editingQuiz).subscribe({
      next: () => {
        alert('✅ Quiz updated successfully!');
        this.editingQuiz = null;
        this.loadQuizzes();
      },
      error: (err) => console.error('❌ Failed to update quiz', err)
    });
  }

  // ✅ Delete question
  deleteQuestion(id: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.http.delete(`${this.apiUrl}/question/delete/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Question deleted!');
          if (this.selectedQuiz) this.viewQuiz(this.selectedQuiz);
        },
        error: (err) => console.error('❌ Failed to delete question', err)
      });
    }
  }

  // ✅ Edit question
  editQuestion(question: any) {
    this.editingQuestion = { ...question };
    this.addingQuestion = false;
  }

  cancelQuestionEdit() {
    this.editingQuestion = null;
  }

  updateQuestion() {
    this.http.put(`${this.apiUrl}/question/update/${this.editingQuestion.id}`, this.editingQuestion).subscribe({
      next: () => {
        alert('✅ Question updated successfully!');
        this.editingQuestion = null;
        if (this.selectedQuiz) this.viewQuiz(this.selectedQuiz);
      },
      error: (err) => console.error('❌ Failed to update question', err)
    });
  }

  // ✅ Add new question form toggle
  startAddQuestion() {
    this.addingQuestion = true;
    this.editingQuestion = null;
    this.newQuestion = {
      text: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: ''
    };
  }

  // ✅ Save new question
  saveNewQuestion() {
    if (!this.selectedQuiz) return;

    const payload = { ...this.newQuestion };
    this.http.post(`${this.apiUrl}/${this.selectedQuiz.id}/add-question`, payload).subscribe({
      next: () => {
        alert('✅ Question added successfully!');
        this.addingQuestion = false;
        this.viewQuiz(this.selectedQuiz);
      },
      error: (err) => console.error('❌ Failed to add question', err)
    });
  }
}
