import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRestaurantComponent } from './reservation-restaurant.component';

describe('ReservationRestaurantComponent', () => {
  let component: ReservationRestaurantComponent;
  let fixture: ComponentFixture<ReservationRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
