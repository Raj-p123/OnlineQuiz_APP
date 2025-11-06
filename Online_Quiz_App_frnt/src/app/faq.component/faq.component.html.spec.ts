import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponentHtml } from './faq.component.html';

describe('FaqComponentHtml', () => {
  let component: FaqComponentHtml;
  let fixture: ComponentFixture<FaqComponentHtml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponentHtml]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponentHtml);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
