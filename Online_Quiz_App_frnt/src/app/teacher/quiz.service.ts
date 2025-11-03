import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestionRequest {
  text: string;
  options: string[];        // length 4
  correctAnswer: string;
}

export interface QuizRequest {
  title: string;
  description: string;
  questions: QuestionRequest[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // change base if needed
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  addQuiz(payload: QuizRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, payload);
  }

  getAllQuizzes() {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
