import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/models/user.model';

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

export interface QuizAttempt {
  category: string;
  score: number;
  total: number;
  attemptedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // This URL matches your backend REST path!
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/student';

  constructor(private http: HttpClient) {}

  // Fetch all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes`);
  }

  // Fetch questions for a specific category
  getQuestionsByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/quiz/category/${category}/questions`);
  }

  // Submit quiz answers by category
  submitAnswers(category: string, answers: { questionId: number; selected: string }[]) {
    return this.http.post(`${this.baseUrl}/quiz/category/${category}/submit`, answers);
  }

  // Save a quiz attempt to backend for history
  saveQuizAttempt(attempt: { category: string; score: number; total: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz/attempt`, attempt);
  }

  // Fetch quiz history for logged-in user
  getQuizHistory(): Observable<QuizAttempt[]> {
    return this.http.get<QuizAttempt[]>(`${this.baseUrl}/quiz/history`);
  }

  getDashboardData(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/${studentId}`);
  }

  getLeaderboard() {
    return this.http.get<any[]>(`${this.baseUrl}/leaderboard`);
  }

  getStudentById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${id}`);
  }

  updateStudent(student: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/${student.id}`, student);
  }
}
