import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSocialeComponent } from './action-sociale.component';

describe('ActionSocialeComponent', () => {
  let component: ActionSocialeComponent;
  let fixture: ComponentFixture<ActionSocialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSocialeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSocialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
