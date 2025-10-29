import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let component: QuizService;
  let fixture: ComponentFixture<QuizService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
