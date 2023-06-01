import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSocieteSearchComponent } from './card-societe-search.component';

describe('CardSocieteSearchComponent', () => {
  let component: CardSocieteSearchComponent;
  let fixture: ComponentFixture<CardSocieteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSocieteSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSocieteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
