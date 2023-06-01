import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCoursTheoriqueComponent } from './reservation-cours-theorique.component';

describe('ReservationCoursTheoriqueComponent', () => {
  let component: ReservationCoursTheoriqueComponent;
  let fixture: ComponentFixture<ReservationCoursTheoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationCoursTheoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCoursTheoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
