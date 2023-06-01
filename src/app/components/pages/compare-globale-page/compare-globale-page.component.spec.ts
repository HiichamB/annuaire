import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareGlobalePageComponent } from './compare-globale-page.component';

describe('CompareGlobalePageComponent', () => {
  let component: CompareGlobalePageComponent;
  let fixture: ComponentFixture<CompareGlobalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareGlobalePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareGlobalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
