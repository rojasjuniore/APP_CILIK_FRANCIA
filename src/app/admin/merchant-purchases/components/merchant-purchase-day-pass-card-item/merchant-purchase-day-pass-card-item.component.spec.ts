import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseDayPassCardItemComponent } from './merchant-purchase-day-pass-card-item.component';

describe('MerchantPurchaseDayPassCardItemComponent', () => {
  let component: MerchantPurchaseDayPassCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseDayPassCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseDayPassCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseDayPassCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
