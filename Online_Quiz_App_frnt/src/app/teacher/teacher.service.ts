import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/teacher'; // ✅ corrected base URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all quizzes
  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/quizzes`);
  }

  // ✅ Add quiz
  addQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/quiz`, quiz);
  }

  // ✅ Update quiz
  updateQuiz(id: number, quiz: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/quiz/${id}`, quiz);
  }

  // ✅ Delete quiz
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quiz/${id}`);
  }

  // ✅ Get teacher profile
  getTeacherById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/${id}`);
  }

  // ✅ Update teacher profile
  updateTeacher(teacher: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseUrl}/${teacher.id}`, teacher);
  }
}
