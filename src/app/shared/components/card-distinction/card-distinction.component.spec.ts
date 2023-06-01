import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDistinctionComponent } from './card-distinction.component';

describe('CardDistinctionComponent', () => {
  let component: CardDistinctionComponent;
  let fixture: ComponentFixture<CardDistinctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDistinctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDistinctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
