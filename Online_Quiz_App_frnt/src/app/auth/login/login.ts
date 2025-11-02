import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        alert('✅ Login Successful!');

        // Store student's name for personalized welcome
        if(res.name) {
          localStorage.setItem('studentName', res.name);
        }

        const role = res.role?.toLowerCase();

        if (role === 'student') {
          this.router.navigate(['/student/dashboard']);
        } else if (role === 'teacher') {
          this.router.navigate(['/teacher/dashboard']);
        } else if (role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          alert('Role not recognized!');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('❌ Invalid credentials');
      }
    });
  }
}
