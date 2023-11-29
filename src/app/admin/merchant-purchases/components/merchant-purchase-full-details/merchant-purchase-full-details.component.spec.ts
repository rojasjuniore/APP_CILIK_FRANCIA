import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseFullDetailsComponent } from './merchant-purchase-full-details.component';

describe('MerchantPurchaseFullDetailsComponent', () => {
  let component: MerchantPurchaseFullDetailsComponent;
  let fixture: ComponentFixture<MerchantPurchaseFullDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseFullDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
