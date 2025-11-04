import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-manage-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-quiz.html',
  styleUrls: ['./manage-quiz.css'] // ✅ fixed "styleUrls" spelling
})

export class ManageQuizComponent implements OnInit {
  quizzes: any[] = [];
  editingQuiz: any = null;
  apiUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
  const url = `${this.apiUrl}/all`;
  console.log('📡 Fetching quizzes from:', url);

  this.http.get<any[]>(url).subscribe({
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




  editQuiz(quiz: any) {
    this.editingQuiz = { ...quiz }; // Create a copy for editing
  }

  updateQuiz() {
    if (this.editingQuiz) {
      this.http.put(`${this.apiUrl}/update/${this.editingQuiz.id}`, this.editingQuiz).subscribe({
        next: () => {
          console.log('✅ Quiz updated successfully');
          this.editingQuiz = null;
          this.loadQuizzes(); // Reload quizzes
        },
        error: (err) => {
          console.error('❌ Failed to update quiz:', err);
          alert('⚠️ Failed to update quiz. Please try again.');
        }
      });
    }
  }

  cancelEdit() {
    this.editingQuiz = null;
  }

  deleteQuiz(quizId: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.http.delete(`${this.apiUrl}/delete/${quizId}`).subscribe({
        next: () => {
          console.log('✅ Quiz deleted successfully');
          this.loadQuizzes(); // Reload quizzes
        },
        error: (err) => {
          console.error('❌ Failed to delete quiz:', err);
          alert('⚠️ Failed to delete quiz. Please try again.');
        }
      });
    }
  }
}
