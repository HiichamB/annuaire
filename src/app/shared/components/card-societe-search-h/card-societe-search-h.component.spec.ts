import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSocieteSearchHComponent } from './card-societe-search-h.component';

describe('CardSocieteSearchHComponent', () => {
  let component: CardSocieteSearchHComponent;
  let fixture: ComponentFixture<CardSocieteSearchHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSocieteSearchHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSocieteSearchHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
