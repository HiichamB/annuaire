import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParusDansLaPresseComponent } from './parus-dans-la-presse.component';

describe('ParusDansLaPresseComponent', () => {
  let component: ParusDansLaPresseComponent;
  let fixture: ComponentFixture<ParusDansLaPresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParusDansLaPresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParusDansLaPresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
