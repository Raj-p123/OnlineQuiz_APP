import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGuard } from './teacher.guard';

describe('TeacherGuard', () => {
  let component: TeacherGuard;
  let fixture: ComponentFixture<TeacherGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
