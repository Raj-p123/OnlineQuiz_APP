import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teacher';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/quizzes`);
  }

  addQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz`, quiz);
  }

  updateQuiz(id: number, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/quiz/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quiz/${id}`);
  }
}
