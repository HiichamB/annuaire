import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuaireSearchDetailsComponent } from './annuaire-search-details.component';

describe('AnnuaireSearchDetailsComponent', () => {
  let component: AnnuaireSearchDetailsComponent;
  let fixture: ComponentFixture<AnnuaireSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnuaireSearchDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuaireSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
