import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentProd } from './environment.prod';

describe('EnvironmentProd', () => {
  let component: EnvironmentProd;
  let fixture: ComponentFixture<EnvironmentProd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentProd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentProd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
