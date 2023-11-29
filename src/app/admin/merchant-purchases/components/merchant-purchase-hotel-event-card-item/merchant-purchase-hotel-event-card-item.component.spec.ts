import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaseHotelEventCardItemComponent } from './merchant-purchase-hotel-event-card-item.component';

describe('MerchantPurchaseHotelEventCardItemComponent', () => {
  let component: MerchantPurchaseHotelEventCardItemComponent;
  let fixture: ComponentFixture<MerchantPurchaseHotelEventCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaseHotelEventCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaseHotelEventCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
