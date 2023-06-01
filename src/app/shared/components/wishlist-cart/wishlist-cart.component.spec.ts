import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCartComponent } from './wishlist-cart.component';

describe('WishlistCartComponent', () => {
  let component: WishlistCartComponent;
  let fixture: ComponentFixture<WishlistCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
