import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPaymentListComponent } from './merchant-payment-list.component';

describe('MerchantPaymentListComponent', () => {
  let component: MerchantPaymentListComponent;
  let fixture: ComponentFixture<MerchantPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
