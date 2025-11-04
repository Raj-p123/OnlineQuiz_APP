import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-category',
  standalone: true,
  imports: [],
  templateUrl: './quiz-category.html',
  styleUrl: './quiz-category.css'
})
export class QuizCategoryComponent {
  categories = [
    { name: 'verbal-reasoning', displayName: 'Verbal Reasoning', description: 'Practice comprehension and language skills.' },
    { name: 'quantitative-aptitude', displayName: 'Quantitative Aptitude', description: 'Sharpen your numeric and calculation ability.' },
    { name: 'logical-reasoning', displayName: 'Logical Reasoning', description: 'Challenge your problem-solving and logical skills.' },
    { name: 'data-interpretation', displayName: 'Data Interpretation', description: 'Test your skill in reading and analyzing data.' },
    { name: 'general-knowledge', displayName: 'General Knowledge', description: 'Expand your awareness of the world.' },
    { name: 'technical-mcq', displayName: 'Technical MCQs', description: 'Test yourself on technical and subject-based topics.' },
    // Add more categories here as you wish
  ];

  constructor(private router: Router) {}

  startQuiz(category: string) {
    this.router.navigate(['/student/play-quiz', category]);
  }
}
