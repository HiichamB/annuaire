import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareGlobaleAllPageComponent } from './compare-globale-all-page.component';

describe('CompareGlobaleAllPageComponent', () => {
  let component: CompareGlobaleAllPageComponent;
  let fixture: ComponentFixture<CompareGlobaleAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareGlobaleAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareGlobaleAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
