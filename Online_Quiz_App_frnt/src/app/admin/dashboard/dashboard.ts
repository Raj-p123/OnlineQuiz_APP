import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManageUsersComponent } from '../manage-user/manage-user';
import { ManageQuizzesComponent } from '../manage-quiz/manage-quiz';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ManageUsersComponent, ManageQuizzesComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class AdminDashboardComponent {
  activeSection: string = '';

  constructor(private router: Router) {}

  showSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
