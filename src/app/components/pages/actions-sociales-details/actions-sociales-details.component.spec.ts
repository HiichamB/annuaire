import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsSocialesDetailsComponent } from './actions-sociales-details.component';

describe('ActionsSocialesDetailsComponent', () => {
  let component: ActionsSocialesDetailsComponent;
  let fixture: ComponentFixture<ActionsSocialesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsSocialesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsSocialesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
