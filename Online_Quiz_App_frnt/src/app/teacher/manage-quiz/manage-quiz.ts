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
}
