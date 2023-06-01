import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisEnLigneComponent } from './devis-en-ligne.component';

describe('DevisEnLigneComponent', () => {
  let component: DevisEnLigneComponent;
  let fixture: ComponentFixture<DevisEnLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisEnLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisEnLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
