import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAutoEcoleComponent } from './reservation-auto-ecole.component';

describe('ReservationAutoEcoleComponent', () => {
  let component: ReservationAutoEcoleComponent;
  let fixture: ComponentFixture<ReservationAutoEcoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationAutoEcoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationAutoEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
