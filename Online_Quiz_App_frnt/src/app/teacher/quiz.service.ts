import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** ---------- INTERFACES ---------- **/
export interface QuestionRequest {
  text: string;
  options: string[]; // exactly 4 options
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

/** ---------- SERVICE ---------- **/
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /** ✅ Base URLs for clear separation **/
  private quizBaseUrl = 'http://localhost:8080/online_quiz_db/api/quiz';
  private studentBaseUrl = 'http://localhost:8080/online_quiz_db/api/student';
  private teacherBaseUrl = 'http://localhost:8080/online_quiz_db/api/teacher';

  constructor(private http: HttpClient) {}

  /** ✅ Add a new quiz (for teacher/admin) */
  addQuiz(quizData: QuizRequest): Observable<any> {
    return this.http.post(`${this.quizBaseUrl}/add`, quizData, { responseType: 'text' });
  }

  /** ✅ Get all quizzes (for student or teacher view) */
  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.quizBaseUrl}/all`);
  }

  /** ✅ Get quiz results for a particular student */
  getResultsForStudent(email: string): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.studentBaseUrl}/results/student/${email}`);
  }

  /** ✅ Submit a quiz by student */
  submitQuiz(quizId: number, payload: SubmissionPayload): Observable<GradingResult> {
    return this.http.post<GradingResult>(`${this.studentBaseUrl}/quiz/${quizId}/submit`, payload);
  }

  /** ✅ Get all results (for teacher dashboard) */
  getAllResults(): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.teacherBaseUrl}/results`);
  }

  /** ✅ Get all results for a specific quiz (teacher view) */
  getResultsForQuiz(quizId: number): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.teacherBaseUrl}/results/quiz/${quizId}`);
  }
}
