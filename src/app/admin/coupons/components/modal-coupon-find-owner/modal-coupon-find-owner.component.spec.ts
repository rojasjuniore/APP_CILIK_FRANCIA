import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCouponFindOwnerComponent } from './modal-coupon-find-owner.component';

describe('ModalCouponFindOwnerComponent', () => {
  let component: ModalCouponFindOwnerComponent;
  let fixture: ComponentFixture<ModalCouponFindOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCouponFindOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCouponFindOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
