import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationActiviteComponent } from './reservation-activite.component';

describe('ReservationActiviteComponent', () => {
  let component: ReservationActiviteComponent;
  let fixture: ComponentFixture<ReservationActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationActiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
