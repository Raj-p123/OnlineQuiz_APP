import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, StudentService } from '../student.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-play',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-play.html',
  styleUrl: './quiz-play.css'
})


export class PlayQuizComponent implements OnInit, OnDestroy {
  quizId!: number;
  questions: Question[] = [];
  currentIndex = 0;
  selectedAnswer: string | null = null;
  answers: { questionId:number, selected:string }[] = [];
  timerSeconds = 0;
  perQuestionSeconds = 60;
  timerSub?: Subscription;
  remaining = 0;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getQuestions(this.quizId).subscribe({
      next: qs => {
        this.questions = qs;
        // If quiz has duration, set perQuestionSeconds from quiz (optional)
        this.startQuestionTimer();
      }
    });
  }

  // start timer for question
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
    // record answer (even if null)
    const q = this.questions[this.currentIndex];
    this.answers.push({ questionId: q.id, selected: this.selectedAnswer || '' });

    // reset and go to next question
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
    this.studentService.submitAnswers(this.quizId, { answers: this.answers }).subscribe({
      next: (res: any) => {
        // backend might return score and details
        this.router.navigate(['/student/result'], { state: res });
      },
      error: _ => {
        // fallback: navigate and show message
        this.router.navigate(['/student/result'], { state: { score: 0, total: this.questions.length }});
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}
