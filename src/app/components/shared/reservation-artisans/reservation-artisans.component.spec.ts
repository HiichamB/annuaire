import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationArtisansComponent } from './reservation-artisans.component';

describe('ReservationArtisansComponent', () => {
  let component: ReservationArtisansComponent;
  let fixture: ComponentFixture<ReservationArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationArtisansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
