import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaleCouponFormComponent } from './pre-sale-coupon-form.component';

describe('PreSaleCouponFormComponent', () => {
  let component: PreSaleCouponFormComponent;
  let fixture: ComponentFixture<PreSaleCouponFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaleCouponFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreSaleCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
