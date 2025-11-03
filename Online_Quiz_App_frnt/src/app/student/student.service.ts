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
  // Update the base URL to match your backend
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  // Fetch all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  // Fetch questions for a specific category (NEW)
  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/category/${category}/questions`);
    // Adjust URL as per your backend implementation
  }

  // Submit quiz answers by category (NEW)
  submitAnswers(category: string, payload: { answers: { questionId: number; selected: string }[] }) {
    return this.http.post(`${this.baseUrl}/category/${category}/submit`, payload);
    // Adjust URL to match your backend endpoint
  }
}
