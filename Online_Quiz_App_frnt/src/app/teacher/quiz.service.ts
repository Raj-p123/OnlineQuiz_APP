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

export interface AnswerPayload {
  questionId: number;
  selected: string;
}

export interface SubmissionPayload {
  studentEmail?: string;
  answers: AnswerPayload[];
}

export interface GradingResult {
  correct: number;
  total: number;
  percentage: number;
}

export interface QuizResult {
  id: number;
  studentEmail: string;
  quizId: number;
  quizTitle: string;
  correct: number;
  total: number;
  percentage: number;
  submittedAt: string;
}



@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // change base if needed
  private baseUrl = 'http://localhost:8080/online_quiz_db/api/quiz';

  constructor(private http: HttpClient) {}

  addQuiz(quizData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/add`, quizData, { responseType: 'text' });
}


  getAllQuizzes() {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }


  getResultsForStudent(email: string) {
  return this.http.get<any[]>(
    `http://localhost:8080/online_quiz_db/api/student/results/student/${email}`
  );
}



submitQuiz(quizId: number, payload: SubmissionPayload): Observable<GradingResult> {
    return this.http.post<GradingResult>(`${this.baseUrl}/student/quiz/${quizId}/submit`, payload);
  }

  getAllResults(): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}/student/results`);
  }

  getResultsForQuiz(quizId: number) {
    return this.http.get<QuizResult[]>(`${this.baseUrl}/student/results/quiz/${quizId}`);
  }

}
