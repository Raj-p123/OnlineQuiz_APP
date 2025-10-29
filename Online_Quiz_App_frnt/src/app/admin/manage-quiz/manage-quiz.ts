import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-manage-quiz',
  imports: [CommonModule],
  templateUrl: './manage-quiz.html',
  styleUrl: './manage-quiz.css'
})

export class ManageQuizzesComponent implements OnInit {
  quizzes: any[] = [];

  ngOnInit() {
    this.quizzes = JSON.parse(localStorage.getItem('teacherQuizzes') || '[]');
  }

  deleteQuiz(id: number) {
    if (confirm('Delete this quiz?')) {
      this.quizzes = this.quizzes.filter(q => q.id !== id);
      localStorage.setItem('teacherQuizzes', JSON.stringify(this.quizzes));
    }
  }
}
