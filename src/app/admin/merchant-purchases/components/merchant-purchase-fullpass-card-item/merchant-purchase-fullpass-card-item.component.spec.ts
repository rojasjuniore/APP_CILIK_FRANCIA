import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseFullpassCardItemComponent } from './merchant-purchase-fullpass-card-item.component';

describe('MerchantPurchaseFullpassCardItemComponent', () => {
  let component: MerchantPurchaseFullpassCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseFullpassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseFullpassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseFullpassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
