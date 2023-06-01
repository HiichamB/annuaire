import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutValidationComponent } from './checkout-validation.component';

describe('CheckoutValidationComponent', () => {
  let component: CheckoutValidationComponent;
  let fixture: ComponentFixture<CheckoutValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
