import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, StudentService } from '../student.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-play.html',
  styleUrl: './quiz-play.css'
})
export class PlayQuizComponent implements OnInit, OnDestroy {
  category!: string;
  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswer: string | null = null;
  answers: { questionId: number, selected: string }[] = [];
  perQuestionSeconds = 60;
  timerSub?: Subscription;
  remaining = 0;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const rawCategory = this.route.snapshot.paramMap.get('category');
    const safeCategory = rawCategory?.trim();

    if (!safeCategory) {
      console.error('Category is missing or invalid');
      return;
    }

    this.category = safeCategory;

    this.studentService.getQuestionsByCategory(this.category).subscribe({
      next: (qs: Question[]) => {
        this.questions = qs;
        this.startQuestionTimer();
      },
      error: err => {
        console.error('Failed to load questions:', err);
      }
    });
  }

  startQuestionTimer() {
    this.remaining = this.perQuestionSeconds;
    this.timerSub = interval(1000).subscribe(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        this.next();
      }
    });
  }

  selectOption(option: string) {
    this.selectedAnswer = option;
  }

  next() {
    const q = this.questions[this.currentIndex];
    this.answers.push({ questionId: q.id, selected: this.selectedAnswer || '' });

    this.selectedAnswer = null;
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.finish();
    } else {
      this.remaining = this.perQuestionSeconds;
    }
  }

  finish() {
    this.timerSub?.unsubscribe();
    this.studentService.submitAnswers(this.category, { answers: this.answers }).subscribe({
      next: (res: any) => {
        this.router.navigate(['/student/result'], { state: res });
      },
      error: _ => {
        this.router.navigate(['/student/result'], { state: { score: 0, total: this.questions.length } });
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}