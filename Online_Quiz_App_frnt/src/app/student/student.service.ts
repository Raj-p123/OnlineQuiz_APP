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
  options: string[]; // assume backend returns array
  correctOption?: string; // backend may omit when sending to student
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // 👇 update base URL to your backend endpoint
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  // Fetch all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
  return this.http.get<Quiz[]>(this.baseUrl);
  }

  // Fetch questions for a specific quiz
  getQuestions(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/${quizId}/questions`);
  }

  // Optional: count quizzes
  getQuizCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  // Submit quiz answers
  submitAnswers(quizId: number, payload: { answers: { questionId: number; selected: string }[] }) {
    return this.http.post(`${this.baseUrl}/${quizId}/submit`, payload);
  }
}
