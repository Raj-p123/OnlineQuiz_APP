import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/online_quiz_db/api/auth'; // ✅ change to your backend API base
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Initialize authentication state after construction
    if (typeof window !== 'undefined') {
      this.isAuthenticatedSubject.next(this.isLoggedIn());
    }
  }

  // 🔹 Login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token && typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // 🔹 Register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // 🔹 Logout
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  // 🔹 Token helpers
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  // 🔹 Check login status
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  // 🔹 Get user role
  getUserRole(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('role');
  }
}
