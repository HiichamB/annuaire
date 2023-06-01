import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSocietePartenaireComponent } from './card-societe-partenaire.component';

describe('CardSocietePartenaireComponent', () => {
  let component: CardSocietePartenaireComponent;
  let fixture: ComponentFixture<CardSocietePartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSocietePartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSocietePartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
