import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCouponFormComponent } from './cart-coupon-form.component';

describe('CartCouponFormComponent', () => {
  let component: CartCouponFormComponent;
  let fixture: ComponentFixture<CartCouponFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCouponFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
