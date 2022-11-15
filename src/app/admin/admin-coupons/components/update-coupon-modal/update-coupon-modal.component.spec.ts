import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCouponModalComponent } from './update-coupon-modal.component';

describe('UpdateCouponModalComponent', () => {
  let component: UpdateCouponModalComponent;
  let fixture: ComponentFixture<UpdateCouponModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCouponModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCouponModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
