import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComparePageComponent } from './all-compare-page.component';

describe('AllComparePageComponent', () => {
  let component: AllComparePageComponent;
  let fixture: ComponentFixture<AllComparePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllComparePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllComparePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
