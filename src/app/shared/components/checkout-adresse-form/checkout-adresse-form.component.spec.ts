import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAdresseFormComponent } from './checkout-adresse-form.component';

describe('CheckoutAdresseFormComponent', () => {
  let component: CheckoutAdresseFormComponent;
  let fixture: ComponentFixture<CheckoutAdresseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutAdresseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAdresseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
