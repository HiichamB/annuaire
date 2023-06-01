import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMaterielComponent } from './reservation-materiel.component';

describe('ReservationMaterielComponent', () => {
  let component: ReservationMaterielComponent;
  let fixture: ComponentFixture<ReservationMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMaterielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
