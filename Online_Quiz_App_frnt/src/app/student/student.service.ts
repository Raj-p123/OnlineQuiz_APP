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
  private baseUrl = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes`);
  }

  getQuestions(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/quiz/${quizId}/questions`);
  }

  getQuizCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/quizzes/count`);
  }

  submitAnswers(quizId: number, payload: { answers: { questionId:number, selected:string }[] }) {
    return this.http.post(`${this.baseUrl}/quiz/${quizId}/submit`, payload);
  }
}
