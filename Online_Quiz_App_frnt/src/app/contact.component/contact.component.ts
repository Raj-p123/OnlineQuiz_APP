import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.name || !this.email || !this.message) {
      this.errorMessage = 'Please fill out all fields before submitting.';
      this.successMessage = '';
      return;
    }

    const messageData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    // ✅ Make sure this URL matches your Spring Boot endpoint
    this.http.post('http://localhost:8080/api/contact', messageData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Message sent successfully!';
          this.errorMessage = '';
          this.name = '';
          this.email = '';
          this.message = '';
        },
        error: (error) => {
          this.errorMessage = 'Something went wrong. Please try again later.';
          this.successMessage = '';
        }
      });
  }
}
