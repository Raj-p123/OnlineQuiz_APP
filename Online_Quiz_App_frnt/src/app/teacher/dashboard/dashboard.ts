import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class TeacherDashboardComponent implements OnInit {

  teacherName = '';
  totalQuizzes = 0;
  totalStudents = 0;
  averageScore = 0;
  activeLink = 'dashboard';
  recentQuizzes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.teacherName = localStorage.getItem('teacherName') || 'Teacher';
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    // Dummy data – Replace with backend API later
    this.totalQuizzes = 12;
    this.totalStudents = 150;
    this.averageScore = 85;
    this.recentQuizzes = [
      { id: 1, title: 'JavaScript Fundamentals', category: 'Programming', createdAt: new Date('2025-10-28') },
      { id: 2, title: 'History of Ancient Rome', category: 'History', createdAt: new Date('2025-10-25') },
    ];
  }

  editQuiz(id: number) {
    alert(`Editing quiz ID: ${id}`);
  }

  navigate(route: string) {
    this.activeLink = route;
    this.router.navigate([`/teacher/${route}`]);
  }
}
