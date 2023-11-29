import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseDetailsComponent } from './merchant-purchase-details.component';

describe('MerchantPurchaseDetailsComponent', () => {
  let component: MerchantPurchaseDetailsComponent;
  let fixture: ComponentFixture<MerchantPurchaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
