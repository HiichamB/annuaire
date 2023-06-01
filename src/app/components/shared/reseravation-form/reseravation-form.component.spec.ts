import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseravationFormComponent } from './reseravation-form.component';

describe('ReseravationFormComponent', () => {
  let component: ReseravationFormComponent;
  let fixture: ComponentFixture<ReseravationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseravationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseravationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
