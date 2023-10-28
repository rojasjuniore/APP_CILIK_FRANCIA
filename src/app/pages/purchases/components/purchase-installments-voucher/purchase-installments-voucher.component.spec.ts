import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInstallmentsVoucherComponent } from './purchase-installments-voucher.component';

describe('PurchaseInstallmentsVoucherComponent', () => {
  let component: PurchaseInstallmentsVoucherComponent;
  let fixture: ComponentFixture<PurchaseInstallmentsVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInstallmentsVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInstallmentsVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
