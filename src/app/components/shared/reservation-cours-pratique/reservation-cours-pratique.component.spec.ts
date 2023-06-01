import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCoursPratiqueComponent } from './reservation-cours-pratique.component';

describe('ReservationCoursPratiqueComponent', () => {
  let component: ReservationCoursPratiqueComponent;
  let fixture: ComponentFixture<ReservationCoursPratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationCoursPratiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCoursPratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
