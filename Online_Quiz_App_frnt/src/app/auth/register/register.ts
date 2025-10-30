import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true, // ✅ for modern Angular apps using standalone components
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'] // ✅ fixed typo (styleUrls instead of styleUrl)
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    role: '' // ✅ added role field
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    // ✅ Call the register API and handle response
    this.auth.register(this.registerData).subscribe({
      next: (res) => {
        alert('✅ Registration successful!');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('❌ Registration failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
