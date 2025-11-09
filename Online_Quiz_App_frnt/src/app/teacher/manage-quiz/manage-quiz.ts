import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  selectedQuiz: any = null;
  questions: any[] = [];
  showAddForm = false;

  newQuestion = {
    text: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  };

  private apiUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  /** ✅ Load all quizzes */
  loadQuizzes(): void {
    this.http.get<any[]>(`${this.apiUrl}/all`).subscribe({
      next: (data) => {
        this.quizzes = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to load quizzes:', err);
      }
    });
  }

  /** ✅ View quiz questions */
  viewQuiz(quiz: any): void {
    this.selectedQuiz = quiz;
    this.showAddForm = false;
    this.http.get<any[]>(`${this.apiUrl}/${quiz.id}/questions`).subscribe({
      next: (data) => {
        console.log('✅ Questions loaded:', data);
        this.questions = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to load questions:', err);
      }
    });
  }

  /** ✅ Delete a quiz */
  deleteQuiz(id: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Quiz deleted successfully!');
          this.selectedQuiz = null;
          this.loadQuizzes();
        },
        error: (err) => console.error('❌ Failed to delete quiz:', err)
      });
    }
  }

  /** ✅ Delete question */
  deleteQuestion(id: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.http.delete(`${this.apiUrl}/question/delete/${id}`, { responseType: 'text' }).subscribe({
        next: () => {
          alert('🗑️ Question deleted successfully!');
          this.viewQuiz(this.selectedQuiz);
        },
        error: (err) => console.error('❌ Failed to delete question:', err)
      });
    }
  }

  /** ✅ Toggle add question form */
  toggleAddQuestion(): void {
    this.showAddForm = !this.showAddForm;
  }

  /** ✅ Save new question */
  saveNewQuestion(): void {
    if (!this.selectedQuiz) return;

    const payload = { ...this.newQuestion };
    this.http.post(`${this.apiUrl}/${this.selectedQuiz.id}/add-question`, payload).subscribe({
      next: () => {
        alert('✅ Question added successfully!');
        this.showAddForm = false;
        this.newQuestion = {
          text: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: ''
        };
        this.viewQuiz(this.selectedQuiz);
      },
      error: (err) => console.error('❌ Failed to add question:', err)
    });
  }
}
