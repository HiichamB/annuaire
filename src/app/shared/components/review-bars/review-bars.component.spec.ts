import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBarsComponent } from './review-bars.component';

describe('ReviewBarsComponent', () => {
  let component: ReviewBarsComponent;
  let fixture: ComponentFixture<ReviewBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewBarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
