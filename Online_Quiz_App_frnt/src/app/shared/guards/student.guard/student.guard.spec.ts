import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGuard } from './student.guard';

describe('StudentGuard', () => {
  let component: StudentGuard;
  let fixture: ComponentFixture<StudentGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
