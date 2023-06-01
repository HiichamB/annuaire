import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHotelsComponent } from './reservation-hotels.component';

describe('ReservationHotelsComponent', () => {
  let component: ReservationHotelsComponent;
  let fixture: ComponentFixture<ReservationHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
