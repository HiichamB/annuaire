import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuaireDetailsPageComponent } from './annuaire-details-page.component';

describe('AnnuaireDetailsPageComponent', () => {
  let component: AnnuaireDetailsPageComponent;
  let fixture: ComponentFixture<AnnuaireDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnuaireDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuaireDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
