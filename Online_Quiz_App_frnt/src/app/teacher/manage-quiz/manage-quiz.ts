import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../teacher.service';
import { AddQuizComponent } from '../add-quiz/add-quiz';

@Component({
  selector: 'app-manage-quiz',
  imports: [CommonModule, FormsModule, AddQuizComponent],
  templateUrl: './manage-quiz.html',
  styleUrl: './manage-quiz.css'
})


export class ManageQuizComponent {
  quizzes: any[] = JSON.parse(localStorage.getItem('teacherQuizzes') || '[]');
  showAddForm = false;

  openAddQuiz() {
    this.showAddForm = true;
  }

  onQuizAdded(newQuiz: any) {
    this.quizzes.push(newQuiz);
    localStorage.setItem('teacherQuizzes', JSON.stringify(this.quizzes));
    this.showAddForm = false;
  }

  editQuiz(quiz: any) {
    const updatedTitle = prompt('Edit quiz title:', quiz.title);
    const updatedDesc = prompt('Edit quiz description:', quiz.description);
    if (updatedTitle && updatedDesc) {
      quiz.title = updatedTitle;
      quiz.description = updatedDesc;
      localStorage.setItem('teacherQuizzes', JSON.stringify(this.quizzes));
    }
  }

  deleteQuiz(id: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizzes = this.quizzes.filter(q => q.id !== id);
      localStorage.setItem('teacherQuizzes', JSON.stringify(this.quizzes));
    }
  }
}
