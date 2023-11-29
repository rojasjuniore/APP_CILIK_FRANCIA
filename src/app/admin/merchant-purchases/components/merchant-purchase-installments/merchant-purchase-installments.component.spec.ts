import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseInstallmentsComponent } from './merchant-purchase-installments.component';

describe('MerchantPurchaseInstallmentsComponent', () => {
  let component: MerchantPurchaseInstallmentsComponent;
  let fixture: ComponentFixture<MerchantPurchaseInstallmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseInstallmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseInstallmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
