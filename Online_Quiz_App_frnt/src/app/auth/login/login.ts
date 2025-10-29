import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.loginData).subscribe({
      next: (response) => {
        alert('Login Successful!');
        const role = response.role;
        if (role === 'STUDENT') {
          this.router.navigate(['/student/dashboard']);
        } else if (role === 'TEACHER') {
          this.router.navigate(['/teacher/dashboard']);
        } else if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        alert('Invalid Credentials');
        console.error('Login error:', error);
      }
    });
  }
}
