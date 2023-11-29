import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseBankTransferInfoCardItemComponent } from './merchant-purchase-bank-transfer-info-card-item.component';

describe('MerchantPurchaseBankTransferInfoCardItemComponent', () => {
  let component: MerchantPurchaseBankTransferInfoCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseBankTransferInfoCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseBankTransferInfoCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseBankTransferInfoCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
