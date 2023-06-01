import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisGeneratorComponent } from './devis-generator.component';

describe('DevisGeneratorComponent', () => {
  let component: DevisGeneratorComponent;
  let fixture: ComponentFixture<DevisGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
