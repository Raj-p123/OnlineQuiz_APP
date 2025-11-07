import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-result.html',
  styleUrls: ['./quiz-result.css']
})
export class ResultComponent {
  score = 0;
  total = 0;
  details: any = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;
    if (state) {
      this.score = state.score ?? 0;
      this.total = state.total ?? 0;
      this.details = state.details ?? null;
    }
  }
}
