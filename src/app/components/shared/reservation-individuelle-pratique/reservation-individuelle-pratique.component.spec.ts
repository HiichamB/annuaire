import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationIndividuellePratiqueComponent } from './reservation-individuelle-pratique.component';

describe('ReservationIndividuellePratiqueComponent', () => {
  let component: ReservationIndividuellePratiqueComponent;
  let fixture: ComponentFixture<ReservationIndividuellePratiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationIndividuellePratiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationIndividuellePratiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
