import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPayementFormComponent } from './checkout-payement-form.component';

describe('CheckoutPayementFormComponent', () => {
  let component: CheckoutPayementFormComponent;
  let fixture: ComponentFixture<CheckoutPayementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPayementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPayementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
