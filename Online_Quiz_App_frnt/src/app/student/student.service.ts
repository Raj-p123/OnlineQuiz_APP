import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  createdBy?: string;
  durationSeconds?: number;
}

export interface Question {
  id: number;
  quizId: number;
  question: string;
  options: string[];
  correctOption?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // This URL matches your backend REST path!
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/student/quiz';

  constructor(private http: HttpClient) {}

  // Fetch all quizzes (fixed endpoint, may need adjustment if backend differs)
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}s`);
  }

  // Fetch questions for a specific category (FIXED)
  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/category/${category}/questions`);
  }

  // Submit quiz answers by category
  submitAnswers(category: string, payload: { answers: { questionId: number; selected: string }[] }) {
    return this.http.post(`${this.baseUrl}/category/${category}/submit`, payload);
  }
}
