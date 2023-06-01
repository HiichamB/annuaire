import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialePartenaireComponent } from './filiale-partenaire.component';

describe('FilialePartenaireComponent', () => {
  let component: FilialePartenaireComponent;
  let fixture: ComponentFixture<FilialePartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilialePartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
